import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_BLOG_CONNECTION, DB_LANDINGPAGE_CONNECTION } from '../constants';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://api:BOuvhU6EkjJbDRZe@tools4edu-cluster-bxyju.mongodb.net/landingpage?retryWrites=true&w=majority`, {
      connectionName: DB_LANDINGPAGE_CONNECTION
    }),
    MongooseModule.forRoot(`mongodb+srv://api:BOuvhU6EkjJbDRZe@tools4edu-cluster-bxyju.mongodb.net/blog?retryWrites=true&w=majority`, {
      connectionName: DB_BLOG_CONNECTION
    })
  ],
  // providers: [...databaseProviders],
  // exports: [...databaseProviders]
})

export class DatabaseModule {}
