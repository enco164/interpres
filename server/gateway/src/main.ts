import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupRouting } from './setupRouting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupRouting(app);

  await app.listen(8090);
}

bootstrap();
