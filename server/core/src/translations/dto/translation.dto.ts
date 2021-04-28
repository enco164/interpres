import { TranslationEntity } from "../entities/translation.entity";

export class TranslationDTO implements Readonly<TranslationDTO> {
  id: string;
  projectId: number;
  lang: string;
  namespace: string;
  key: string;
  value: string;

  public static from(dto: Partial<TranslationDTO>) {
    const t = new TranslationDTO();
    t.id = dto.id;
    t.projectId = dto.projectId;
    t.lang = dto.lang;
    t.namespace = dto.namespace;
    t.key = dto.key;
    t.value = dto.value;
    return t;
  }

  public static fromEntity(entity: TranslationEntity) {
    return TranslationDTO.from({
      id: entity.id,
      projectId: entity.projectId,
      lang: entity.lang,
      namespace: entity.namespace,
      key: entity.key,
      value: entity.value,
    });
  }

  public toEntity() {
    const t = new TranslationEntity();
    t.id = this.id;
    t.projectId = this.projectId;
    t.lang = this.lang;
    t.namespace = this.namespace;
    t.key = this.key;
    t.value = this.value;
    return t;
  }
}
