import { Column, Entity, OneToMany } from "typeorm";
import { TranslationEntity } from "../../translations/entities/translation.entity";
import { BaseEntity } from "../../data/base-entity";

@Entity({ name: "projects" })
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  githubOwner: string;

  @Column()
  githubRepo: string;

  @Column()
  lngLoadPath: string;

  @Column({ type: "text", array: true, nullable: true })
  languages: string[];

  @OneToMany(() => TranslationEntity, (translation) => translation.project)
  translations: Promise<TranslationEntity[]>;
}
