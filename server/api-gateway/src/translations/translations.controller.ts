import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Operation } from "fast-json-patch";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateTranslationDto } from "./dto/create-translation.dto";
import { TranslationsService } from "./translations.service";

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

  @UseGuards(JwtAuthGuard)
  @Post()
  createTranslation(@Body() newData: CreateTranslationDto) {
    this.logger.verbose({
      request: `POST /translations`,
      body: newData,
    });
    return this.translationsService.createTranslation(newData);
  }
}
