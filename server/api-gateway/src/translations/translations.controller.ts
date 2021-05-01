import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TranslationsService } from "./translations.service";
import { Operation } from "fast-json-patch";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("translations")
export class TranslationsController {
  private readonly logger = new Logger(TranslationsController.name);

  constructor(private readonly translationsService: TranslationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public getTranslations(@Query("projectId") projectId?: string) {
    this.logger.verbose(`GET /translations?projectId=${projectId}`);
    return this.translationsService.getTranslations(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  patchTranslation(@Param("id") id: string, @Body() patches: Operation[]) {
    this.logger.verbose({
      request: `PATCH /translations/${id}`,
      body: patches,
    });
    return this.translationsService.patchTranslation(id, patches);
  }
}
