import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerUtil } from './utils/logger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar logs de requests HTTP
  app.use((req, res, next) => {
    LoggerUtil.logRequest(req.method, req.url);
    next();
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
