import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(process.env.PORT || 3000);

  if (module.hot && !process.env.production) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
