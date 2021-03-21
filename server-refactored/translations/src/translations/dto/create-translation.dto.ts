export class CreateTranslationDto {
  projectId: number;
  lang: string;
  namespace: string;
  key: string;
  value: string;
}
