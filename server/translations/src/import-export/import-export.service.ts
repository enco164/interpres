import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { merge } from "lodash/fp";
import { forkJoin, from } from "rxjs";
import { concatMap, map, throwIfEmpty } from "rxjs/operators";
import { ImportFileDto } from "../projects/dto/import-file.dto";
import { ProjectsService } from "../projects/projects.service";
import { TranslationDTO } from "../translations/dto/translation.dto";
import { Translation } from "../translations/entities/translation.entity";
import { TranslationsService } from "../translations/translations.service";

@Injectable()
export class ImportExportService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly translationsService: TranslationsService,
    @Inject("INTEGRATION_SERVICE") private integrationServiceClient: ClientProxy
  ) {}

  importTranslations(projectId: number) {
    return this.projectsService.findOne(projectId).pipe(
      throwIfEmpty(
        () => new NotFoundException(`Project with id ${projectId} not found`)
      ),
      concatMap((project) =>
        forkJoin([
          this.integrationServiceClient.send(
            { cmd: "import" },
            {
              owner: project.githubOwner,
              repo: project.githubRepo,
              translationsLoadPath: project.lngLoadPath,
            }
          ),
          from(project.translations).pipe(
            concatMap((projectTranslations) =>
              this.translationsService.removeTranslations(projectTranslations)
            )
          ),
        ])
      ),
      concatMap(([dataFromGithub]) =>
        this.importGithubData(dataFromGithub, projectId)
      )
    );
  }

  exportTranslations(projectId: number) {
    return this.translationsService.findByProjectId(projectId).pipe(
      map((projectTranslations) =>
        projectTranslations.reduce((acc, translation) => {
          if (!acc[translation.lang]) {
            acc[translation.lang] = {};
          }
          if (!acc[translation.lang][translation.namespace]) {
            acc[translation.lang][translation.namespace] = [];
          }
          acc[translation.lang][translation.namespace].push(translation);
          return acc;
        }, {})
      )
    );
  }

  buildJsonTreeFromTranslations(translations: Translation[]) {
    return translations
      .map((translation) => this.translationToJsonTree(translation))
      .reduce(merge, {});
  }

  importFileToProject(projectId: number, importFileDto: ImportFileDto) {
    return forkJoin(
      this.getKeyValues(importFileDto.file).map((kv) =>
        this.translationsService
          .create({
            key: kv.key,
            value: kv.value,
            lang: importFileDto.lang,
            projectId: projectId,
            namespace: importFileDto.namespace,
          })
          .then(TranslationDTO.fromEntity)
      )
    );
  }

  getKeyValues(
    object: Record<string, unknown>
  ): Array<{ key: string; value: string }> {
    return Object.keys(object).flatMap((key) =>
      this.getPlainKeyValues(key, object[key])
    );
  }

  private getPlainKeyValues(
    prefixKey: string,
    value: unknown
  ): Array<{ key: string; value: string }> {
    if (typeof value === "string") {
      return [{ key: prefixKey, value }];
    }
    return Object.keys(value).flatMap((key) =>
      this.getPlainKeyValues(`${prefixKey}.${key}`, value[key])
    );
  }

  private translationToJsonTree(translation: Translation) {
    const tree = {};
    const keySlices = translation.key.split(".");
    let treePointer = tree;
    for (let i = 0; i < keySlices.length - 1; i++) {
      const slice = keySlices[i];
      treePointer[slice] = {};
      treePointer = treePointer[slice];
    }
    treePointer[keySlices[keySlices.length - 1]] = translation.value;
    return tree;
  }

  private importFilesToProject(
    projectId: number,
    lang: string,
    filesForLng: Array<{ namespace: string; content: Record<string, string> }>
  ) {
    return forkJoin(
      filesForLng.reduce((acc, file) => {
        return {
          ...acc,
          [file.namespace]: this.importFileToProject(projectId, {
            file: file.content,
            lang,
            namespace: file.namespace,
          }),
        };
      }, {})
    );
  }

  private importGithubData(dataFromGithub: any, projectId: number) {
    return forkJoin(
      Object.keys(dataFromGithub).reduce((acc, lang) => {
        const filesForLng = dataFromGithub[lang];
        return {
          ...acc,
          [lang]: this.importFilesToProject(projectId, lang, filesForLng),
        };
      }, {})
    );
  }
}
