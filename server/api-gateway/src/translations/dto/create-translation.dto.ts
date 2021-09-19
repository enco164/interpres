import { Allow } from "class-validator";

export class CreateTranslationDto {
  @Allow()
  projectId: number;
  @Allow()
  lang: string;
  @Allow()
  namespace: string;
  @Allow()
  key: string;
  @Allow()
  value: string;
}
