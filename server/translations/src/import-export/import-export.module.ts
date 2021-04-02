import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ProjectsModule } from "../projects/projects.module";
import { TranslationsModule } from "../translations/translations.module";
import { ImportExportController } from "./import-export.controller";
import { ImportExportService } from "./import-export.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "INTEGRATION_SERVICE",
        transport: Transport.TCP,
        options: { port: 8092 },
      },
    ]),
    ProjectsModule,
    TranslationsModule,
  ],
  controllers: [ImportExportController],
  providers: [ImportExportService],
})
export class ImportExportModule {}
