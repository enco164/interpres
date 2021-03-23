import { Injectable, NotFoundException } from "@nestjs/common";
import { EMPTY, from, of } from "rxjs";
import {
  catchError,
  concatMap,
  map,
  throwIfEmpty,
  toArray,
} from "rxjs/operators";
import { ImportExportService } from "../import-export/import-export.service";
import { CreateTranslationDto } from "../translations/dto/create-translation.dto";
import { TranslationsService } from "../translations/translations.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ImportFileDto } from "./dto/import-file.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./entities/project.entity";
import { ProjectRepository } from "./project.repository";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly importExportService: ImportExportService,
    private readonly translationsService: TranslationsService
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

  async importFileToProject(projectId: number, importFileDto: ImportFileDto) {
    return from(this.importExportService.importFile(importFileDto.file)).pipe(
      map((kv) => ({
        key: kv.key,
        value: kv.value,
        lang: importFileDto.lang,
        projectId: projectId,
        namespace: importFileDto.namespace,
      })),
      concatMap((createTranslationDto: CreateTranslationDto) =>
        from(this.translationsService.create(createTranslationDto)).pipe(
          catchError(() => EMPTY)
        )
      ),
      toArray()
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
}
