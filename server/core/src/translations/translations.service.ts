import { Injectable, NotFoundException } from "@nestjs/common";
import * as jsonpatch from "fast-json-patch";
import { Operation } from "fast-json-patch";
import { from } from "rxjs";
import { ProjectRepository } from "../projects/project.repository";
import { CreateTranslationDto } from "./dto/create-translation.dto";
import { TranslationEntity } from "./entities/translation.entity";
import { TranslationRepository } from "./translation.repository";

@Injectable()
export class TranslationsService {
  constructor(
    private translationRepository: TranslationRepository,
    private projectRepository: ProjectRepository
  ) {}

  async create(createTranslationDto: CreateTranslationDto) {
    const { projectId, ...translationAttributes } = createTranslationDto;
    const project = await this.projectRepository.findOne(projectId);
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    const translation = new TranslationEntity();
    Object.assign(translation, translationAttributes);
    translation.project = Promise.resolve(project);

    return this.translationRepository.save(translation);
  }

  findAll() {
    return this.translationRepository.find();
  }

  findByProjectId(projectId: string) {
    return from(
      this.translationRepository.find({
        where: {
          projectId,
        },
      })
    );
  }

  async patch(id: string, patches: Operation[]) {
    const translation = await this.translationRepository.findOne(id);
    if (!translation) {
      throw new NotFoundException(`Translation with id ${id} not found`);
    }

    const patchedTranslation = jsonpatch.applyPatch(translation, patches)
      .newDocument;
    return this.translationRepository.save(patchedTranslation);
  }

  removeTranslations(translations: TranslationEntity[]) {
    return this.translationRepository.remove(translations);
  }
}
