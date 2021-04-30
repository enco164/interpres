import { Allow } from "class-validator";

export class ExportRequest {
  @Allow()
  projectId: string;

  @Allow()
  title: string;

  @Allow()
  description: string;
}
