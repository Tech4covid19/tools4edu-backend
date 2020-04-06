import { Module } from '@nestjs/common';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';
import { StakeholdersModule } from '../stakeholders/stakeholders.module';
import { FaqSchema } from './schemas/faqs.schema';
import { FaqsService } from './faqs.service';
import { FaqsResolver } from './faqs.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvidersModule } from '../providers/providers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Faq',
        schema: FaqSchema,
        collection: 'faqs'
      }
    ], DB_LANDINGPAGE_CONNECTION),
    StakeholdersModule,
    ProvidersModule
  ],
  providers: [
    FaqsService,
    FaqsResolver
  ],
  exports: [
    FaqsService,
    FaqsResolver
  ]
})
export class FaqsModule {}
