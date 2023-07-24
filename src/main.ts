import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Request limiter settings
  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Max 100 requests per minute
  });

  // Apply the limiter as middleware to all requests
  app.use(limiter);

  await app.listen(3000);
}
bootstrap();
