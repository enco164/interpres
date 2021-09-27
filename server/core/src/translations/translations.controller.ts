import { Body, Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Operation } from "fast-json-patch";
import { TranslationDTO } from "src/translations/dto/translation.dto";
import { CreateTranslationDto } from "./dto/create-translation.dto";
import { DeleteTranslationsRequest } from "./dto/delete-translations.request";
import { GetTranslationsRequest } from "./dto/get-translations.request";
import { TranslationsService } from "./translations.service";

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
    const translations = body.translations
      .map(TranslationDTO.from)
      .map((translationDto) => translationDto.toEntity());
    return this.translationsService.removeTranslations(translations);
  }

  @MessagePattern({ cmd: "translations/patchTranslation" })
  patch(@Body() body: { patches: Operation[]; id: string }) {
    return this.translationsService.patch(body.id, body.patches);
  }

  @MessagePattern({ cmd: "translations/createTranslation" })
  create(@Body() body: CreateTranslationDto) {
    return this.translationsService.create(body);
  }
}
