import { TranslationDto } from "../../translations/dto/translation.dto";

export interface ProjectDto {
  id: string;
  name: string;
  githubOwner: string;
  githubRepo: string;
  lngLoadPath: string;
  languages: string[] | null;
  translations: TranslationDto[];
}
