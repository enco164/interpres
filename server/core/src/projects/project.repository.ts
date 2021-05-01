import { EntityRepository, Repository } from "typeorm";
import { ProjectEntity } from "./entities/project.entity";

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {}
