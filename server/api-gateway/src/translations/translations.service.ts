import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Operation } from "fast-json-patch";
import { CreateTranslationDto } from "./dto/create-translation.dto";

@Injectable()
export class TranslationsService {
  private readonly logger = new Logger(TranslationsService.name);

  constructor(
    @Inject("CORE_SERVICE")
    private readonly coreMicroserviceClient: ClientProxy
  ) {}

  getTranslations(projectId?: string) {
    return this.coreMicroserviceClient.send(
      { cmd: "translations/getTranslations" },
      { projectId }
    );
  }

  patchTranslation(id: string, patches: Operation[]) {
    return this.coreMicroserviceClient.send(
      { cmd: "translations/patchTranslation" },
      { id, patches }
    );
  }

  createTranslation(newData: CreateTranslationDto) {
    return this.coreMicroserviceClient.send(
      { cmd: "translations/createTranslation" },
      newData
    );
  }
}
