import { Module } from "@nestjs/common";
import { TranslationsModule } from "../translations/translations.module";
import { ImportExportController } from "./import-export.controller";
import { ImportExportService } from "./import-export.service";

@Module({
  imports: [TranslationsModule],
  controllers: [ImportExportController],
  providers: [ImportExportService],
})
export class ImportExportModule {}
