import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { WrapResponsInterceptor } from './common/interceptors/wrap-respons/wrap-respons.interceptor';
import { time } from 'console';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponsInterceptor(),
    new TimeoutInterceptor(),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
