import { Injectable } from '@nestjs/common';

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
}
