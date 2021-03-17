import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupOpenApi } from "./config/OpenApi.config";
import { setupRouting } from "./setupRouting";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupRouting(app);
  setupOpenApi(app);

  await app.listen(8090);
}

bootstrap();
