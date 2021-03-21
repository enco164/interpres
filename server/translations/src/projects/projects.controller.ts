import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ImportFileDto } from "./dto/import-file.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectsService } from "./projects.service";

const logger = new Logger("ProjectsController");

@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectsService.findOne(+id);
  }

  @Get(":id/translations")
  findTranslations(@Param("id") id: string) {
    return this.projectsService.findProjectTranslations(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectsService.remove(+id);
  }

  @Post(":id/import")
  importFile(@Param("id") id: string, @Body() importFileDto: ImportFileDto) {
    logger.log(`POST /projects/${id}/export ${JSON.stringify(importFileDto)}`);
    return this.projectsService.importFileToProject(+id, importFileDto);
  }

  @Get(":id/export")
  exportTranslations(@Param("id") id: string, @Query("lang") lang: string) {
    logger.log(`GET /projects/${id}/export?lang=${lang}`);
    return this.projectsService.exportTranslations(+id, lang);
  }
}
