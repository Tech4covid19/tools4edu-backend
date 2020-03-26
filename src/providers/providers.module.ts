import { Module } from '@nestjs/common';
import { ProvidersResolver } from './providers.resolver';
import { ProvidersService } from './providers.service';
import { DB_LANDINGPAGE_CONNECTION, PROVIDERS_MODEL } from '../constants';
import { Connection } from "mongoose";
import { DatabaseModule } from '../database/database.module';
import { ProviderSchema } from './schemas/providers.schema';
import { VideosModule } from '../videos/videos.module';

export const providersProviders = [
  {
    provide: PROVIDERS_MODEL,
    useFactory: (connection: Connection) => connection.model('Provider', ProviderSchema),
    inject: [DB_LANDINGPAGE_CONNECTION]
  }
];

@Module({
  imports: [
    DatabaseModule,
    VideosModule
  ],
  providers: [
    ...providersProviders,
    ProvidersService,
    ProvidersResolver
  ],
  exports: [
    ...providersProviders,
    ProvidersService,
    ProvidersResolver
  ]
})
export class ProvidersModule {}
