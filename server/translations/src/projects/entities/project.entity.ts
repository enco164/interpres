import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Translation } from "../../translations/entities/translation.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  githubOwner: string;

  @Column()
  githubRepo: string;

  @Column()
  lngLoadPath: string;

  @Column({ type: "text", array: true, nullable: true })
  languages: string[] | null;

  @OneToMany(() => Translation, (translation) => translation.project)
  translations: Promise<Translation[]>;
}
