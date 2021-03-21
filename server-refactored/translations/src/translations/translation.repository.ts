import { EntityRepository, Repository } from "typeorm";
import { Translation } from "./entities/translation.entity";

@EntityRepository(Translation)
export class TranslationRepository extends Repository<Translation> {}
