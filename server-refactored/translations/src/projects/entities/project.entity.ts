import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Translation } from "../../translations/entities/translation.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Translation, (translation) => translation.project)
  translations: Promise<Translation[]>;
}
