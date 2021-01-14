import { Module } from '@nestjs/common';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';

@Module({
  imports: [],
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class TranslationsModule {}
