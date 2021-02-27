export class ImportFileDto<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  lang: string;
  file: T;
}
