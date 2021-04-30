import { Allow, IsNotEmpty } from "class-validator";

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  githubOwner: string;

  @IsNotEmpty()
  githubRepo: string;

  @IsNotEmpty()
  lngLoadPath: string;

  @Allow()
  languages: string[] | null;
}
