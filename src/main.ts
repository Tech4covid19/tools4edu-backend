import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressApp), {
    cors: {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      "preflightContinue": false,
      "optionsSuccessStatus": 204,
      "allowedHeaders": ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
      "credentials": true
    }
  });
  await app.listen(3000);

  if (module.hot && !process.env.production) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();

