import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createAppAuth } from "@octokit/auth-app";
import { components } from "@octokit/openapi-types/dist-types/generated/types";
import { retry } from "@octokit/plugin-retry";
import { Octokit } from "@octokit/rest";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { forkJoin, from, Observable, of } from "rxjs";
import { catchError, concatMap, map } from "rxjs/operators";
import { ExportTranslationsToRepo } from "./dto/export-translations-to-repo";

import { ImportTranslationsFromRepoParam } from "./dto/import-translations-from-repo-param";

const MyOctokit = Octokit.plugin(retry, createPullRequest);

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

  exportTranslationsToRepo({
    owner,
    repo,
    title,
    description,
    payload,
    translationsLoadPath,
  }: ExportTranslationsToRepo) {
    const filesChanges = this.getFilesChanges(payload, translationsLoadPath);
    const commitTime = new Date().getTime();
    return this.getInstallationClient(owner, repo).pipe(
      concatMap((installationClient) =>
        installationClient.createPullRequest({
          owner,
          repo,
          title,
          body: description,
          head: `interpres/export_${commitTime}`,
          changes: [
            {
              files: filesChanges,
              commit: `Export from Interpres ${commitTime}`,
            },
          ],
        })
      )
    );
  }

  testConnection(data: {
    name: string;
    githubOwner: string;
    githubRepo: string;
    lngLoadPath: string;
  }): Observable<{
    repoExists: boolean;
    appInstalled: boolean;
    foundLanguages: string[] | null;
  }> {
    const installationClient$ = this.getInstallationClient(
      data.githubOwner,
      data.githubRepo
    );
    return installationClient$.pipe(
      concatMap((installationClient) =>
        installationClient.repos.getContent({
          owner: data.githubOwner,
          repo: data.githubRepo,
          path: data.lngLoadPath,
        })
      ),
      map(
        (response) =>
          response.data as components["schemas"]["content-directory"]
      ),
      map((value) => ({
        repoExists: true,
        appInstalled: true,
        foundLanguages: value.map((v) => v.name),
      })),
      catchError(() =>
        of({ repoExists: false, appInstalled: false, foundLanguages: [] })
      )
    );
  }

  private getFilesChanges(
    payload: Record<string, Record<string, Record<string, string>>>,
    translationsLoadPath: string
  ) {
    return Object.entries(payload).reduce((filesAcc, [lang, langVal]) => {
      const changes = this.getNamespaceFileChanges(
        translationsLoadPath,
        lang,
        langVal
      );
      filesAcc = Object.assign({}, filesAcc, changes);
      return filesAcc;
    }, {});
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

  private getNamespaceFileChanges(
    pathPrefix: string,
    lang: string,
    langVal: Record<string, Record<string, string>>
  ) {
    return Object.entries(langVal).reduce((nsAcc, [ns, jsonFile]) => {
      const filePath = [pathPrefix, lang, ns].join("/").substring(1);
      nsAcc[filePath] = JSON.stringify(jsonFile, null, 2).concat("\n");
      return nsAcc;
    }, {});
  }
}
