import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupOpenApi(app: INestApplication) {
  const BASE_URL = process.env.BASE_URL || "http://localhost:8090";

  const options = new DocumentBuilder()
    .setTitle("Interpres API")
    .setDescription("Interpres API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("api", app, document, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: auto }",
    swaggerOptions: {
      urls: [
        {
          url: BASE_URL + "/api/translation-service/v3/swagger.json",
          name: "translation-service",
        },
      ],
    },
  });
}
