import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 전역 파이프
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 전역 예외 필터
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.BACK_PORT ?? 3000);
}

bootstrap();
