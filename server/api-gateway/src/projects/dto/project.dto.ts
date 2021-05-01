import { TranslationDto } from "../../translations/dto/translation.dto";
import { Allow, IsNotEmpty } from "class-validator";

export class ProjectDto {
  @IsNotEmpty()
  id: string;
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
  @IsNotEmpty()
  translations: TranslationDto[];
}
