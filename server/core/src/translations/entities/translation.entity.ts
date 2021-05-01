import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../data/base-entity";
import { ProjectEntity } from "../../projects/entities/project.entity";

@Entity({ name: "translations" })
@Index(["projectId", "key", "lang", "namespace"], { unique: true })
export class TranslationEntity extends BaseEntity {
  @Column()
  projectId: string;

  @Column()
  lang: string;

  @Column()
  namespace: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @ManyToOne(() => ProjectEntity, (project) => project.id)
  @JoinColumn({ name: "projectId" })
  project: Promise<ProjectEntity>;
}
