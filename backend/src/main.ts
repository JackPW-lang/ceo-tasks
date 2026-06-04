import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS enabled -> allows Vue dev server (Port 8080) to communicate with NestJS (Port 3000)
  await app.listen(3000);
}
bootstrap();
