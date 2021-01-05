import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { TranslationsService } from './translations.service';

@ApiTags('translations')
@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @Get()
  findAll() {
    return this.translationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translationsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslationDto,
  ) {
    return this.translationsService.update(+id, updateTranslationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translationsService.remove(+id);
  }
}
