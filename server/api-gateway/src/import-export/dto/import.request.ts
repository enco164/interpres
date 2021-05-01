import { Allow } from "class-validator";

export class ImportRequest {
  @Allow()
  projectId: string;
}
