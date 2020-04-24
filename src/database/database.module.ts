import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_BLOG_CONNECTION, DB_LANDINGPAGE_CONNECTION } from '../constants';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.NEST_APP_DB_LANDINGPAGE_CONNECTION_STRING, {
      connectionName: DB_LANDINGPAGE_CONNECTION
    }),
    MongooseModule.forRoot(process.env.NEST_APP_DB_BLOG_CONNECTION_STRING, {
      connectionName: DB_BLOG_CONNECTION
    })
  ]
})

export class DatabaseModule {}
