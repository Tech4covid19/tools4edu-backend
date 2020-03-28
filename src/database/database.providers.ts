import * as mongoose from 'mongoose';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';

export const databaseProviders = [
  {
    provide: DB_LANDINGPAGE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(`mongodb+srv://api:BOuvhU6EkjJbDRZe@tools4edu-cluster-bxyju.mongodb.net/landingpage?retryWrites=true&w=majority`)
  }
];