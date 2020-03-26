import * as mongoose from 'mongoose';
import { DB_CONNECTION_PROVIDER } from '../constants';

export const databaseProviders = [
  {
    provide: DB_CONNECTION_PROVIDER,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb+srv://tools4edu_dbuser:hqw7VK8yW8m5zvu@tools4edu-cluster-bxyju.mongodb.net/test?retryWrites=true&w=majority`)
  }
];