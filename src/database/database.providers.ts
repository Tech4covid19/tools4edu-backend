import * as mongoose from 'mongoose';
import { DB_BLOG_CONNECTION, DB_LANDINGPAGE_CONNECTION } from '../constants';
import { MongooseModule } from '@nestjs/mongoose';

export const databaseProviders = [
  MongooseModule.forRoot(`mongodb+srv://api:BOuvhU6EkjJbDRZe@tools4edu-cluster-bxyju.mongodb.net/landingpage?retryWrites=true&w=majority`, {
    connectionName: DB_LANDINGPAGE_CONNECTION
  }),
  MongooseModule.forRoot(`mongodb+srv://api:BOuvhU6EkjJbDRZe@tools4edu-cluster-bxyju.mongodb.net/blog?retryWrites=true&w=majority`, {
    connectionName: DB_BLOG_CONNECTION
  })
  // {
  //   provide: DB_LANDINGPAGE_CONNECTION,
  //   useFactory: (): Promise<typeof mongoose> =>
  //     mongoose.connect(`mongodb+srv://api:BOuvhU6EkjJbDRZe@tools4edu-cluster-bxyju.mongodb.net/landingpage?retryWrites=true&w=majority`)
  // },
  // {
  //   provide: DB_BLOG_CONNECTION,
  //   useFactory: (): Promise<typeof mongoose> =>
  //     mongoose.connect(`mongodb+srv://api:BOuvhU6EkjJbDRZe@tools4edu-cluster-bxyju.mongodb.net/blog?retryWrites=true&w=majority`)
  // }
];
