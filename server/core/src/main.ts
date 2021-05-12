import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

const PORT = +process.env.CORE_SERVICE_PORT;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: PORT,
    },
  });
  await app.listen(() =>
    console.log(`core microservice is listening at port ${PORT}`)
  );
}

bootstrap();
