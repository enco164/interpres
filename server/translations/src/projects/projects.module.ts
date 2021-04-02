import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportExportModule } from "../import-export/import-export.module";
import { TranslationsModule } from "../translations/translations.module";
import { ProjectRepository } from "./project.repository";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRepository]),
    ClientsModule.register([
      {
        name: "INTEGRATION_SERVICE",
        transport: Transport.TCP,
        options: { port: 8092 },
      },
    ]),
    ImportExportModule,
    TranslationsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
