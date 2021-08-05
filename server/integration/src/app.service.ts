import { HttpService, Injectable } from "@nestjs/common";
import { forkJoin, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { GitHubService } from "./git-hub/git-hub.service";

@Injectable()
export class AppService {
  constructor(
    private readonly http: HttpService,
    private readonly githubService: GitHubService
  ) {}

  testConnection(data: {
    name: string;
    githubOwner: string;
    githubRepo: string;
    lngLoadPath: string;
  }) {
    const repoExist$ = this.http
      .get(`https://github.com/${data.githubOwner}/${data.githubRepo}`)
      .pipe(
        catchError((_) => of({ repoExists: false })),
        map((_) => ({ repoExists: true }))
      );
    const repoSpecificData$ = this.githubService.testConnection(data);
    return forkJoin([repoExist$, repoSpecificData$]).pipe(
      ([repoExist, repoSpecificData]) => {
        return { ...repoExist, ...repoSpecificData };
      }
    );
  }

  getHello(): string {
    return "Hello World!";
  }
}
