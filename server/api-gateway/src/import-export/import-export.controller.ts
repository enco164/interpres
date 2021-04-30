import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ImportExportService } from "./import-export.service";
import { ImportRequest } from "./dto/import.request";
import { ExportRequest } from "./dto/export.request";

@Controller("import-export")
export class ImportExportController {
  private readonly logger = new Logger(ImportExportController.name);

  constructor(private readonly importExportService: ImportExportService) {}

  @Post("import")
  import(@Body() body: ImportRequest) {
    this.logger.verbose({ request: "POST /import-export/import", body });
    return this.importExportService.import(body);
  }

  @Post("export")
  export(@Body() body: ExportRequest) {
    this.logger.verbose({ request: "POST /import-export/export", body });
    return this.importExportService.export(body);
  }
}
