import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { forkJoin, from, of } from "rxjs";
import { concatMap, map, throwIfEmpty } from "rxjs/operators";
import { ImportExportService } from "../import-export/import-export.service";
import { TranslationDTO } from "../translations/dto/translation.dto";
import { TranslationsService } from "../translations/translations.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ImportFileDto } from "./dto/import-file.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./entities/project.entity";
import { ProjectRepository } from "./project.repository";

const logger = new Logger("ProjectsService");

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly importExportService: ImportExportService,
    private readonly translationsService: TranslationsService,
    @Inject("INTEGRATION_SERVICE") private integrationServiceClient: ClientProxy
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return of(new Project()).pipe(
      map((p) => {
        p.name = createProjectDto.name;
        return p;
      }),
      concatMap((p) => this.projectRepository.save(p))
    );
  }

  findAll() {
    return from(this.projectRepository.find());
  }

  findOne(id: number) {
    return from(this.projectRepository.findOne(id));
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return from(this.projectRepository.findOne(id)).pipe(
      throwIfEmpty(
        () => new NotFoundException(`Project with id ${id} not found`)
      ),
      map((project) => this.projectRepository.merge(project, updateProjectDto)),
      concatMap((project) => this.projectRepository.save(project))
    );
  }

  remove(id: number) {
    return from(this.projectRepository.delete(id));
  }

  findProjectTranslations(projectId: number) {
    return from(this.projectRepository.findOne(projectId)).pipe(
      throwIfEmpty(
        () => new NotFoundException(`Project with id ${projectId} not found`)
      ),
      concatMap((project) => project.translations)
    );
  }

  exportTranslations(projectId: number, lang: string) {
    return this.translationsService
      .findByProjectIdAndLang(projectId, lang)
      .pipe(
        map((translations) =>
          this.importExportService.buildJsonTreeFromTranslations(translations)
        )
      );
  }

  importGithubToProject(projectId: number) {
    return this.findOne(projectId).pipe(
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

  importFileToProject(projectId: number, importFileDto: ImportFileDto) {
    return forkJoin(
      this.importExportService.importFile(importFileDto.file).map((kv) =>
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
}
