import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectsModule } from "./projects/projects.module";
import { TranslationsModule } from "./translations/translations.module";
import { ImportExportModule } from "./import-export/import-export.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.TRANSLATIONS_DB_HOST,
      port: +process.env.TRANSLATIONS_DB_PORT,
      username: process.env.TRANSLATIONS_DB_USERNAME,
      password: process.env.TRANSLATIONS_DB_PASSWORD,
      database: process.env.TRANSLATIONS_DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true, //process.env.NODE_ENV !== 'production',
    }),
    ProjectsModule,
    TranslationsModule,
    ImportExportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
