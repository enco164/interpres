import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

const PORT = +process.env.CORE_SERVICE_PORT;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: PORT,
    },
  });
  await app.listen(() => `core microservice is listening at port ${PORT}`);
}

bootstrap();
