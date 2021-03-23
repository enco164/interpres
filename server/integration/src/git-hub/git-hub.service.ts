import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createAppAuth } from "@octokit/auth-app";
import { components } from "@octokit/openapi-types/dist-types/generated/types";
import { retry } from "@octokit/plugin-retry";
import { Octokit } from "@octokit/rest";
import { forkJoin, from, Observable, of, zip } from "rxjs";
import { concatMap, map } from "rxjs/operators";

import { ImportTranslationsFromRepoParam } from "./dto/import-translations-from-repo-param";

const MyOctokit = Octokit.plugin(retry);

const logger = new Logger("GitHubService");

function parseJsonContentFile(
  fileContentData: components["schemas"]["content-file"]
) {
  return JSON.parse(Buffer.from(fileContentData.content, "base64").toString());
}

function extractResponseData<T>(response): T {
  return response.data as T;
}

@Injectable()
export class GitHubService {
  private octokit: Octokit;
  private readonly githubAppId: string;
  private readonly githubAppPrivateKey: string;

  constructor(private configService: ConfigService) {
    this.githubAppId = this.configService.get<string>("GITHUB_APP_ID");
    this.githubAppPrivateKey = this.configService.get<string>(
      "GITHUB_APP_PRIVATE_KEY"
    );

    this.octokit = new MyOctokit({
      authStrategy: createAppAuth,
      auth: {
        appId: this.githubAppId,
        privateKey: this.githubAppPrivateKey,
      },
    });
  }

  createRemoteBranch(owner: string, repo: string, branchName: string) {
    const newBranchName = `refs/heads/${branchName}`;
    return this.getInstallationClient(owner, repo).pipe(
      concatMap((installationClient) =>
        zip([
          of(installationClient),
          installationClient.repos.listCommits({
            owner,
            repo,
          }),
        ])
      ),
      map(([installationClient, commits]) => [
        installationClient,
        commits.data[0].sha,
      ]),
      concatMap(([installationClient, lastSHA]) =>
        installationClient.git.createRef({
          owner,
          repo,
          ref: newBranchName,
          sha: lastSHA,
        })
      )
    );
  }

  commitUpdatedFile(param: {
    owner: string;
    repo: string;
    filePath: string;
    branchName: string;
    fileContent: string;
  }) {
    return this.getInstallationClient(param.owner, param.repo).pipe(
      concatMap((installationClient) =>
        zip(
          of(installationClient),
          installationClient.repos.getContent({
            owner: param.owner,
            repo: param.repo,
            path: param.filePath,
            ref: param.branchName,
          })
        )
      ),
      map(([installationClient, response]) => [
        installationClient,
        response.data as components["schemas"]["content-file"],
      ]),
      concatMap(([installationClient, fileData]) =>
        (installationClient as Octokit).repos.createOrUpdateFileContents({
          owner: param.owner,
          repo: param.repo,
          path: param.filePath,
          branch: param.branchName,
          message: `Update ${param.filePath}`,
          sha: fileData.sha,
          content: Buffer.from(param.fileContent).toString("base64"),
        })
      )
    );
  }

  createPullRequest(param: {
    owner: string;
    repo: string;
    branchName: string;
  }) {
    return this.getInstallationClient(param.owner, param.repo).pipe(
      concatMap((installationClient) =>
        zip([
          of(installationClient),
          installationClient.repos.get({
            owner: param.owner,
            repo: param.repo,
          }),
        ])
      ),
      map(([installationClient, response]) => [
        installationClient,
        response.data,
      ]),
      concatMap(([installationClient, responseData]) =>
        (installationClient as Octokit).pulls.create({
          owner: param.owner,
          repo: param.repo,
          head: param.branchName,
          base: responseData.default_branch,
          title: "Title",
        })
      )
    );
  }

  importTranslationsFromRepo({
    owner,
    repo,
    translationsLoadPath,
  }: ImportTranslationsFromRepoParam) {
    const installationClient$ = this.getInstallationClient(owner, repo);
    const langDirs$ = installationClient$.pipe(
      concatMap((installationClient) =>
        installationClient.repos.getContent({
          owner,
          repo,
          path: translationsLoadPath,
        })
      ),
      map(
        (response) =>
          response.data as components["schemas"]["content-directory"]
      )
    );

    const applyGetContent = (octokit: Octokit, owner: string, repo: string) => (
      path: string
    ) => octokit.repos.getContent({ owner, repo, path });

    return forkJoin([installationClient$, langDirs$]).pipe(
      concatMap(([installationClient, langDirs]) => {
        const getContent = applyGetContent(installationClient, owner, repo);
        return forkJoin(
          langDirs.reduce((previousValue, currentValue) => {
            previousValue[currentValue.name] = this.getLanguageFiles(
              getContent,
              currentValue.path
            );

            return previousValue;
          }, {})
        );
      })
    );
  }

  private getLanguageFiles(getContent, langFolderPath: string) {
    return from(getContent(langFolderPath)).pipe(
      map((response) =>
        extractResponseData<components["schemas"]["content-file"][]>(response)
      ),
      concatMap((fileData) =>
        forkJoin([
          ...fileData.map((data) =>
            forkJoin({
              namespace: of(data.name),
              content: from(getContent(data.path)).pipe(
                map(extractResponseData),
                map(parseJsonContentFile)
              ),
            })
          ),
        ])
      )
    );
  }

  private getInstallationClient(
    owner: string,
    repo: string
  ): Observable<Octokit> {
    return from(this.octokit.apps.getRepoInstallation({ owner, repo })).pipe(
      map((result) => result.data),
      map(
        (installation) =>
          new MyOctokit({
            authStrategy: createAppAuth,
            auth: {
              appId: this.githubAppId,
              privateKey: this.githubAppPrivateKey,
              installationId: installation.id,
            },
          })
      )
    );
  }
}
