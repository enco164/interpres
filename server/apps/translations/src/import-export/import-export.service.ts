import { Injectable } from '@nestjs/common';
import { merge } from 'lodash/fp';
import { Translation } from '../translations/entities/translation.entity';

@Injectable()
export class ImportExportService {
  importFile(
    file: Record<string, unknown>,
  ): Array<{ key: string; value: string }> {
    return this.getKeyValues(file);
  }

  private getKeyValues(
    object: Record<string, unknown>,
  ): Array<{ key: string; value: string }> {
    return Object.keys(object).flatMap((key) =>
      this.getPlainKeyValues(key, object[key]),
    );
  }

  private getPlainKeyValues(
    prefixKey: string,
    value: unknown,
  ): Array<{ key: string; value: string }> {
    if (typeof value === 'string') {
      return [{ key: prefixKey, value }];
    }
    return Object.keys(value).flatMap((key) =>
      this.getPlainKeyValues(`${prefixKey}.${key}`, value[key]),
    );
  }

  buildJsonTreeFromTranslations(translations: Translation[]) {
    return translations
      .map((translation) => this.translationToJsonTree(translation))
      .reduce(merge, {});
  }

  private translationToJsonTree(translation: Translation) {
    const tree = {};
    const keySlices = translation.key.split('.');
    let treePointer = tree;
    for (let i = 0; i < keySlices.length - 1; i++) {
      const slice = keySlices[i];
      treePointer[slice] = {};
      treePointer = treePointer[slice];
    }
    treePointer[keySlices[keySlices.length - 1]] = translation.value;
    return tree;
  }
}
