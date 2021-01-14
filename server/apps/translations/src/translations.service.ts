import { Injectable } from '@nestjs/common';

@Injectable()
export class TranslationsService {
  getHello(): string {
    return 'Hello World!';
  }
}
