export class ImportFileDto<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  lang: string;
  namespace: string;
  file: T;
}
