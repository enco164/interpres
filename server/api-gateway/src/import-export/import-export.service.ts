import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ImportRequest } from "./dto/import.request";
import { concatMap, tap, throwIfEmpty } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { ProjectDto } from "../projects/dto/project.dto";
import { ExportRequest } from "./dto/export.request";

@Injectable()
export class ImportExportService {
  private readonly logger = new Logger(ImportExportService.name);

  constructor(
    @Inject("IMPORT_EXPORT_SERVICE")
    private readonly importExportMicroserviceClient: ClientProxy,
    @Inject("CORE_SERVICE")
    private readonly coreMicroserviceClient: ClientProxy,
    @Inject("INTEGRATION_SERVICE")
    private readonly integrationMicroserviceClient: ClientProxy
  ) {}

  import({ projectId }: ImportRequest) {
    return this.coreMicroserviceClient
      .send<ProjectDto>({ cmd: "projects/getProjectById" }, { id: projectId })
      .pipe(
        throwIfEmpty(
          () => new NotFoundException(`Project with id ${projectId} not found`)
        ),
        tap((project) => console.log(project)),
        concatMap((project) =>
          forkJoin([
            this.integrationMicroserviceClient.send(
              { cmd: "import" },
              {
                owner: project.githubOwner,
                repo: project.githubRepo,
                translationsLoadPath: project.lngLoadPath,
              }
            ),
            this.coreMicroserviceClient.send(
              { cmd: "translations/removeTranslations" },
              { translations: project.translations }
            ),
          ])
        ),
        concatMap(([dataFromGithub]) =>
          this.coreMicroserviceClient.send(
            { cmd: "import-export/importTranslations" },
            { projectId, parsedTranslations: dataFromGithub }
          )
        )
      );
  }

  export({ projectId, title, description }: ExportRequest) {
    return forkJoin([
      this.coreMicroserviceClient.send<ProjectDto>(
        { cmd: "projects/getProjectById" },
        { id: projectId }
      ),
      this.coreMicroserviceClient
        .send<ProjectDto>(
          { cmd: "translations/getTranslations" },
          { projectId }
        )
        .pipe(
          concatMap((translations) =>
            this.coreMicroserviceClient.send(
              { cmd: "import-export/prepareTranslationForExport" },
              { translations }
            )
          )
        ),
    ]).pipe(
      concatMap(([project, payload]) =>
        this.integrationMicroserviceClient.send(
          { cmd: "export" },
          {
            owner: project.githubOwner,
            repo: project.githubRepo,
            title,
            description,
            translationsLoadPath: project.lngLoadPath,
            payload,
          }
        )
      )
    );
  }
}
