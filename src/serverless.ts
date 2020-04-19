import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import * as serverless from 'aws-serverless-express';
import * as express from 'express';
import { Server } from 'http';
import { AppModule } from './app.module';

export async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    "credentials": true
  })

  await app.init();
  return serverless.createServer(expressApp);
}

let cachedServer: Server;

export const handler: Handler = (event: any, context: Context) => {
  if (!cachedServer) {
    bootstrap().then(server => {
      cachedServer = server;
      return serverless.proxy(server, event, context);
    });
  } else {
    return serverless.proxy(cachedServer, event, context);
  }
};
