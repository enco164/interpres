import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectRepository } from "../projects/project.repository";
import { TranslationRepository } from "./translation.repository";
import { TranslationsController } from "./translations.controller";
import { TranslationsService } from "./translations.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TranslationRepository, ProjectRepository]),
  ],
  controllers: [TranslationsController],
  providers: [TranslationsService],
  exports: [TranslationsService],
})
export class TranslationsModule {}
