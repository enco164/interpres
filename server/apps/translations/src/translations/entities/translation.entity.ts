import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "../../projects/entities/project.entity";

@Entity()
@Index(["projectId", "key", "lang", "namespace"], { unique: true })
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  lang: string;

  @Column()
  namespace: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @ManyToOne(() => Project, (project) => project.id)
  @JoinColumn({ name: "projectId" })
  project: Promise<Project>;
}
