import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from "./app.module";

const PORT = +process.env.USER_MANAGEMENT_SERVICE_PORT;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT,
      },
    }
  );
  await app.listen(() => `user-management microservice is listening at port ${PORT}`);
}

bootstrap();
