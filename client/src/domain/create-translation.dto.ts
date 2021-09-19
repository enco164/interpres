import { Translation } from "./translation";

export type CreateTranslationDto = Omit<Translation, "id"> & {
  projectId: string;
};
