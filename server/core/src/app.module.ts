import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ImportExportModule } from "./import-export/import-export.module";
import { config } from "./ormconfig";
import { ProjectsModule } from "./projects/projects.module";
import { TranslationsModule } from "./translations/translations.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ProjectsModule,
    TranslationsModule,
    ImportExportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
