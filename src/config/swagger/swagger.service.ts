import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerService {
  constructor(private configService: ConfigService) {}

  public setupSwagger(app: INestApplication, options?: any) {
    const port = this.configService.get<number>('PORT');
    const apiURL = this.configService.get<string>('API_URL');

    const swaggerConfig = new DocumentBuilder()
      .setTitle('LMS API')
      .setDescription('LMS API Documentations')
      .setVersion('1.0')
      .addServer(`http://localhost:${port}`, 'Local')
      .addServer(apiURL, 'Production')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig, options);

    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}
