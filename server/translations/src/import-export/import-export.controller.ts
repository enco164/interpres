import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ExportTranslationsDto } from "./dto/export-translations.dto";
import { ImportTranslationsDto } from "./dto/import-translations.dto";
import { ImportExportService } from "./import-export.service";

const logger = new Logger("ImportExportController");

@Controller("import-export")
export class ImportExportController {
  constructor(private readonly importExportService: ImportExportService) {}

  @Post("import")
  importGithubToProject(@Body() importTranslationsDto: ImportTranslationsDto) {
    logger.log(
      `POST /import-export/import, ${JSON.stringify(importTranslationsDto)}`
    );
    return this.importExportService.importTranslations(
      importTranslationsDto.projectId
    );
  }

  @Post("export")
  exportTranslations(@Body() exportTranslationsDto: ExportTranslationsDto) {
    return this.importExportService.exportTranslations(exportTranslationsDto);
  }
}
