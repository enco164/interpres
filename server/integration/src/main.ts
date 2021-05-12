import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

const PORT = +process.env.INTEGRATION_SERVICE_PORT;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: PORT,
      },
    }
  );
  app.listen(() =>
    console.log(`integration microservice is listening at ${PORT}`)
  );
}
bootstrap();
