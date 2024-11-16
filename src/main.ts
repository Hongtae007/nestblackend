import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 5000);
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`Database URL: ${process.env.DATABASE_URL}`);
}
bootstrap();
