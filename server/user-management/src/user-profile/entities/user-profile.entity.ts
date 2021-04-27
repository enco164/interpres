import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user_profile"})
@Index(["provider", "providerId"], { unique: true })
export class UserProfileEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;

  @Column()
  displayName: string;

  @Column()
  photo: string | null;
}
