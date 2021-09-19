export interface TestConnectionResult {
  repoExists: boolean;
  appInstalled: boolean;
  foundLanguages: string[] | null;
}
