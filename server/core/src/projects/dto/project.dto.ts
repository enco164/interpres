import { TranslationEntity } from "../../translations/entities/translation.entity";
import { ProjectEntity } from "../entities/project.entity";

export class ProjectDto implements Readonly<ProjectDto> {
  id: string;
  name: string;
  githubOwner: string;
  githubRepo: string;
  lngLoadPath: string;
  languages: string[] | null;
  translations: TranslationEntity[];
  createdAt: Date;
  updatedAt: Date;

  public static from(dto: Partial<ProjectDto>) {
    const pr = new ProjectDto();

    pr.id = dto.id;
    pr.name = dto.name;
    pr.githubOwner = dto.githubOwner;
    pr.githubRepo = dto.githubRepo;
    pr.lngLoadPath = dto.lngLoadPath;
    pr.languages = dto.languages;
    pr.translations = dto.translations;
    pr.createdAt = dto.createdAt;
    pr.updatedAt = dto.updatedAt;

    return pr;
  }

  public static async fromEntity(entity: ProjectEntity) {
    const translations = await entity.translations;
    return this.from({
      name: entity.name,
      githubOwner: entity.githubOwner,
      githubRepo: entity.githubRepo,
      lngLoadPath: entity.lngLoadPath,
      languages: entity.languages,
      translations: translations,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  public toEntity() {
    const pr = new ProjectEntity();

    pr.id = this.id;
    pr.name = this.name;
    pr.githubOwner = this.githubOwner;
    pr.githubRepo = this.githubRepo;
    pr.lngLoadPath = this.lngLoadPath;
    pr.languages = this.languages;
    pr.translations = Promise.resolve(this.translations);
    pr.createdAt = this.createdAt;
    pr.updatedAt = this.updatedAt;

    return pr;
  }
}
