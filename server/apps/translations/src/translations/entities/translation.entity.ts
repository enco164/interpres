import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity()
@Index(['projectId', 'key', 'lang'], { unique: true })
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  key: string;

  @Column()
  lang: string;

  @Column()
  value: string;

  @ManyToOne(() => Project, (project) => project.id)
  @JoinColumn({ name: 'projectId' })
  project: Promise<Project>;
}
