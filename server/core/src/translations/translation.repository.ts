import { EntityRepository, Repository } from "typeorm";
import { TranslationEntity } from "./entities/translation.entity";

@EntityRepository(TranslationEntity)
export class TranslationRepository extends Repository<TranslationEntity> {}
