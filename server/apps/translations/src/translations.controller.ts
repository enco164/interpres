import { Controller, Get } from '@nestjs/common';
import { TranslationsService } from './translations.service';

@Controller()
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get()
  getHello(): string {
    return this.translationsService.getHello();
  }
}
