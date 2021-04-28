import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { forkJoin, from, of } from "rxjs";
import { concatMap, map, throwIfEmpty } from "rxjs/operators";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectRepository } from "./project.repository";
import { ProjectDto } from "./dto/project.dto";
import { ProjectEntity } from "./entities/project.entity";

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(private readonly projectRepository: ProjectRepository) {}

  findAll() {
    this.logger.verbose("findAll()");
    return from(this.projectRepository.find()).pipe(
      concatMap((projects) =>
        forkJoin(projects.map((p) => ProjectDto.fromEntity(p)))
      )
    );
  }

  create(createProjectDto: CreateProjectDto) {
    return of(new ProjectEntity()).pipe(
      map((p) => {
        p.name = createProjectDto.name;
        return p;
      }),
      concatMap((p) => this.projectRepository.save(p))
    );
  }

  findOne(id: string) {
    return from(this.projectRepository.findOne(id));
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return from(this.projectRepository.findOne(id)).pipe(
      throwIfEmpty(
        () => new NotFoundException(`Project with id ${id} not found`)
      ),
      map((project) => this.projectRepository.merge(project, updateProjectDto)),
      concatMap((project) => this.projectRepository.save(project))
    );
  }

  remove(id: string) {
    return from(this.projectRepository.delete(id));
  }

  findProjectTranslations(projectId: string) {
    return from(this.projectRepository.findOne(projectId)).pipe(
      throwIfEmpty(
        () => new NotFoundException(`Project with id ${projectId} not found`)
      ),
      concatMap((project) => project.translations)
    );
  }
}
