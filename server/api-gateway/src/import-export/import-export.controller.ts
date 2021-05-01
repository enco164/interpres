import { Body, Controller, Logger, Post, UseGuards } from "@nestjs/common";
import { ImportExportService } from "./import-export.service";
import { ImportRequest } from "./dto/import.request";
import { ExportRequest } from "./dto/export.request";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("import-export")
export class ImportExportController {
  private readonly logger = new Logger(ImportExportController.name);

  constructor(private readonly importExportService: ImportExportService) {}

  @UseGuards(JwtAuthGuard)
  @Post("import")
  import(@Body() body: ImportRequest) {
    this.logger.verbose({ request: "POST /import-export/import", body });
    return this.importExportService.import(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post("export")
  export(@Body() body: ExportRequest) {
    this.logger.verbose({ request: "POST /import-export/export", body });
    return this.importExportService.export(body);
  }
}
