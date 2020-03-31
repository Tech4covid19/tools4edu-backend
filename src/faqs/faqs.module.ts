import { Module } from '@nestjs/common';
import { DB_LANDINGPAGE_CONNECTION, FAQS_MODEL } from '../constants';
import { Connection } from 'mongoose';
import { DatabaseModule } from '../database/database.module';
import { StakeholdersModule } from '../stakeholders/stakeholders.module';
import { FaqSchema } from './schemas/faqs.schema';
import { FaqsService } from './faqs.service';
import { FaqsResolver } from './faqs.resolver';

export const faqsProviders = [
  {
    provide: FAQS_MODEL,
    useFactory: (connection: Connection) => connection.model('Faq', FaqSchema),
    inject: [DB_LANDINGPAGE_CONNECTION]
  }
];

@Module({
  imports: [
    DatabaseModule,
    StakeholdersModule
  ],
  providers: [
    ...faqsProviders,
    FaqsService,
    FaqsResolver
  ],
  exports: [
    ...faqsProviders,
    FaqsService,
    FaqsResolver
  ]
})
export class FaqsModule {}
