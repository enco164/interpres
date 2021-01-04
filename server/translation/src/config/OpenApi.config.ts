import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  let BASE_URL = process.env.BASE_URL || 'http://localhost:8090';

  const httpAdapter = app.getHttpAdapter();

  const options = new DocumentBuilder()
    .setTitle('Translation service API')
    .addServer(BASE_URL + '/api/translation-service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  httpAdapter.get('/v3/swagger.json', (req, res) => res.json(document));
}
