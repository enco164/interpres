import { ParsedTranslationsDto } from "./parsed-translations.dto";

export interface ImportTranslationsDto {
  projectId: string;
  parsedTranslations: ParsedTranslationsDto;
}
