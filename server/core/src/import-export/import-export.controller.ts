import { Body, Controller, Logger } from "@nestjs/common";
import { ImportTranslationsDto } from "./dto/import-translations.dto";
import { ImportExportService } from "./import-export.service";
import { MessagePattern } from "@nestjs/microservices";
import { PrepareTranslationsRequest } from "./dto/prepare-translations.request";

@Controller("import-export")
export class ImportExportController {
  private readonly logger = new Logger(ImportExportController.name);

  constructor(private readonly importExportService: ImportExportService) {}

  @MessagePattern({ cmd: "import-export/importTranslations" })
  importTranslations(@Body() body: ImportTranslationsDto) {
    this.logger.verbose({ cmd: "import-export/importTranslations", body });
    return this.importExportService.importTranslations(body);
  }

  @MessagePattern({ cmd: "import-export/prepareTranslationForExport" })
  prepareTranslationForExport(@Body() body: PrepareTranslationsRequest) {
    this.logger.verbose({
      cmd: "import-export/prepareTranslationForExport",
      body,
    });
    return this.importExportService.prepareExportPayload(body.translations);
  }
}
