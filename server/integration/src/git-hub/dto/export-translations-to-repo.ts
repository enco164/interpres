export interface ExportTranslationsToRepo {
  owner: string;
  repo: string;
  translationsLoadPath: string;
  payload: Record<string, Record<string, Record<string, string>>>;
}
