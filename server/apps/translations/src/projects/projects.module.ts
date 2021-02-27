import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportExportModule } from '../import-export/import-export.module';
import { TranslationsModule } from '../translations/translations.module';
import { ProjectRepository } from './project.repository';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRepository]),
    ImportExportModule,
    TranslationsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
