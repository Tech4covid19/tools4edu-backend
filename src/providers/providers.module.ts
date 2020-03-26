import { Module } from '@nestjs/common';
import { ProvidersResolver } from './providers.resolver';
import { ProvidersService } from './providers.service';
import { DB_CONNECTION_PROVIDER, PROVIDERS_MODEL } from '../constants';
import { Connection } from "mongoose";
import { DatabaseModule } from '../database/database.module';
import { ProviderSchema } from './schemas/providers.schema';

export const providersProviders = [
  {
    provide: PROVIDERS_MODEL,
    useFactory: (connection: Connection) => connection.model('Provider', ProviderSchema),
    inject: [DB_CONNECTION_PROVIDER]
  }
];

@Module({
  imports: [DatabaseModule],
  providers: [
    ...providersProviders,
    ProvidersService,
    ProvidersResolver
  ]
})
export class ProvidersModule {}
