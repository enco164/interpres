import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { from, of } from "rxjs";
import { concatMap, map, throwIfEmpty } from "rxjs/operators";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./entities/project.entity";
import { ProjectRepository } from "./project.repository";

const logger = new Logger("ProjectsService");

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectRepository) {}

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
}
