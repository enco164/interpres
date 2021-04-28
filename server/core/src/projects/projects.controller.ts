import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectsService } from "./projects.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller("projects")
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern({ cmd: "projects/getProjects" })
  getProjects() {
    return this.projectsService.findAll();
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectsService.findOne(id);
  }

  @Get(":id/translations")
  findTranslations(@Param("id") id: string) {
    return this.projectsService.findProjectTranslations(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    this.logger.log(`PUT /projects/${id} ${JSON.stringify(updateProjectDto)}`);
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectsService.remove(id);
  }
}
