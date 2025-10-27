import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerUtil } from './utils/logger.util';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('SmartCampus UCV API')
    .setDescription('API para la gestión de actividades sostenibles en el campus')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  // Habilitar logs de requests HTTP
  app.use((req, res, next) => {
    LoggerUtil.logRequest(req.method, req.url);
    next();
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
