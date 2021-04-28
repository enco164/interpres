export class CreateTranslationDto {
  projectId: string;
  lang: string;
  namespace: string;
  key: string;
  value: string;
}
