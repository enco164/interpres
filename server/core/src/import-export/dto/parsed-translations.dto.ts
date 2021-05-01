type ParsedTranslationContent =
  | string
  | { [key: string]: ParsedTranslationContent };

export type ParsedTranslationsDto = {
  [lang: string]: Array<{
    namespace: string;
    content: ParsedTranslationContent;
  }>;
};
