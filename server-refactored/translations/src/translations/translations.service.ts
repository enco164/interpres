import { Injectable, NotFoundException } from "@nestjs/common";
import * as jsonpatch from "fast-json-patch";
import { Operation } from "fast-json-patch";
import { from } from "rxjs";
import { ProjectRepository } from "../projects/project.repository";
import { CreateTranslationDto } from "./dto/create-translation.dto";
import { UpdateTranslationDto } from "./dto/update-translation.dto";
import { Translation } from "./entities/translation.entity";
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

    const translation = new Translation();
    Object.assign(translation, translationAttributes);
    translation.project = Promise.resolve(project);

    return this.translationRepository.save(translation);
  }

  findAll() {
    return this.translationRepository.find();
  }

  findOne(id: number) {
    return this.translationRepository.findOne(id);
  }

  findByProjectIdAndLang(projectId: number, lang: string) {
    return from(
      this.translationRepository.find({
        where: {
          projectId,
          lang,
        },
      })
    );
  }

  async update(id: number, updateTranslationDto: UpdateTranslationDto) {
    const { projectId, ...translationAttributes } = updateTranslationDto;
    const translation = await this.translationRepository.findOne(id);

    // TODO: check how repository.merge works
    Object.assign(translation, translationAttributes);

    return this.translationRepository.save(translation);
  }

  remove(id: number) {
    return this.translationRepository.delete(id);
  }

  async patch(id: number, patches: Operation[]) {
    const translation = await this.translationRepository.findOne(id);
    if (!translation) {
      throw new NotFoundException(`Translation with id ${id} not found`);
    }

    const patchedTranslation = jsonpatch.applyPatch(translation, patches)
      .newDocument;
    return this.translationRepository.save(patchedTranslation);
  }
}
