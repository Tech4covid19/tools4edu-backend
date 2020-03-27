import * as mongoose from 'mongoose';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';

export const databaseProviders = [
  {
    provide: DB_LANDINGPAGE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DATABASE_LANDINGPAGE_CONNECTION_STRING)
  }
];