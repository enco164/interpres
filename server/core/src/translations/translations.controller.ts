import { Body, Controller, Logger } from "@nestjs/common";
import { Operation } from "fast-json-patch";
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
}
