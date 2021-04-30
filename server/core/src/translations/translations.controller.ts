import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Operation } from "fast-json-patch";
import { CreateTranslationDto } from "./dto/create-translation.dto";
import { UpdateTranslationDto } from "./dto/update-translation.dto";
import { TranslationsService } from "./translations.service";
import { MessagePattern } from "@nestjs/microservices";
import { GetTranslationsRequest } from "./dto/get-translations.request";
import { DeleteTranslationsRequest } from "./dto/delete-translations.request";

@Controller("translations")
export class TranslationsController {
  private readonly logger = new Logger(TranslationsController.name);

  constructor(private readonly translationsService: TranslationsService) {}

  @MessagePattern({ cmd: "translations/getTranslations" })
  getTranslations(@Body() body: GetTranslationsRequest) {
    this.logger.log({ cmd: "translations/getTranslations", data: body });
    if (body.projectId) {
      return this.translationsService.findByProjectId(body.projectId);
    }
    return this.translationsService.findAll();
  }

  @MessagePattern({ cmd: "translations/removeTranslations" })
  removeTranslations(@Body() body: DeleteTranslationsRequest) {
    this.logger.verbose({ cmd: "translations/removeTranslations", body });
    let translations = body.translations.map((translationDto) =>
      translationDto.toEntity()
    );
    return this.translationsService.removeTranslations(translations);
  }

  @MessagePattern({ cmd: "translations/patchTranslation" })
  patch(@Body() body: { patches: Operation[]; id: string }) {
    return this.translationsService.patch(body.id, body.patches);
  }

  @Post()
  create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @Get()
  findAll() {
    return this.translationsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.translationsService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateTranslationDto: UpdateTranslationDto
  ) {
    return this.translationsService.update(+id, updateTranslationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.translationsService.remove(+id);
  }
}
