import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { App as GithubApp } from "@octokit/app";
import { components } from "@octokit/openapi-types/dist-types/generated/types";
import { Octokit } from "@octokit/rest";
import { from, Observable, of, zip } from "rxjs";
import { concatMap, map } from "rxjs/operators";

const logger = new Logger("GitHubService");

@Injectable()
export class GitHubService {
  private githubApp: GithubApp;

  constructor(private configService: ConfigService) {
    const githubAppId = this.configService.get<string>("GITHUB_APP_ID");
    const githubAppPrivateKey = this.configService.get<string>(
      "GITHUB_APP_PRIVATE_KEY"
    );
    logger.log(`GitHubService: ${githubAppId}`);

    this.githubApp = new GithubApp({
      appId: githubAppId,
      privateKey: githubAppPrivateKey,
    });
  }

  getRepoInstallationAccessToken(
    owner: string,
    repo: string
  ): Observable<{
    token: string;
    expires_at: string;
  }> {
    return from(
      this.githubApp.octokit.request("GET /repos/{owner}/{repo}/installation", {
        owner,
        repo,
      })
    ).pipe(
      map((result) => result.data),
      concatMap((installation) =>
        this.githubApp.octokit.request(
          "POST /app/installations/{installation_id}/access_tokens",
          { installation_id: installation.id }
        )
      ),
      map((result) => result.data)
    );
  }

  async getRemoteJSONFile(owner: string, repo: string, path: string) {
    return this.getInstallationClient(owner, repo).pipe(
      concatMap((installationClient) => {
        return installationClient.repos.getContent({
          owner,
          repo,
          path,
        });
      }),
      map((response) => response.data as components["schemas"]["content-file"]),
      map((data) => JSON.parse(Buffer.from(data.content, "base64").toString()))
    );
  }

  createRemoteBranch(owner: string, repo: string, branchName: string) {
    const newBranchName = `refs/heads/${branchName}`;
    return this.getInstallationClient(owner, repo).pipe(
      concatMap((installationClient) =>
        zip(
          of(installationClient),
          installationClient.repos.listCommits({
            owner,
            repo,
          })
        )
      ),
      concatMap(([installationClient, commits]) =>
        zip(of(installationClient), of(commits.data[0].sha))
      ),
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
      concatMap(([installationClient, response]) =>
        zip(
          of(installationClient),
          of(response.data as components["schemas"]["content-file"])
        )
      ),
      concatMap(([installationClient, fileData]) =>
        installationClient.repos.createOrUpdateFileContents({
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
        zip(
          of(installationClient),
          installationClient.repos.get({ owner: param.owner, repo: param.repo })
        )
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

  private getInstallationClient(
    owner: string,
    repo: string
  ): Observable<Octokit> {
    return from(
      this.githubApp.octokit.request("GET /repos/{owner}/{repo}/installation", {
        owner,
        repo,
      })
    ).pipe(
      map((result) => result.data),
      concatMap((installation) =>
        this.githubApp.octokit.request(
          "POST /app/installations/{installation_id}/access_tokens",
          { installation_id: installation.id }
        )
      ),
      map((result) => result.data.token),
      map(
        (installationAccessToken) =>
          new Octokit({
            auth: installationAccessToken,
          })
      )
    );
  }
}
