export interface ExportTranslationsToRepo {
  owner: string;
  repo: string;
  title: string;
  description: string;
  translationsLoadPath: string;
  payload: Record<string, Record<string, Record<string, string>>>;
}
