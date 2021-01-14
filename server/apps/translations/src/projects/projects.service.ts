import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  create(createProjectDto: CreateProjectDto) {
    const project = new Project();
    project.name = createProjectDto.name;

    return this.projectRepository.save(project);
  }

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return this.projectRepository.findOne(id);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    project.name = updateProjectDto.name;

    return this.projectRepository.save(project);
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }

  async findProjectTranslations(projectId: number) {
    const project = await this.projectRepository.findOne(projectId);
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }
    return await project.translations;
  }
}
