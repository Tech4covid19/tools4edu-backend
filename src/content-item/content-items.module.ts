import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentItemSchema } from './schemas/content-items.schema';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';
import { StakeholdersModule } from '../stakeholders/stakeholders.module';
import { ProvidersModule } from '../providers/providers.module';
import { ContentTagsModule } from '../content-tags/content-tags.module';
import { ContentItemsService } from './content-items.service';
import { ContentItemsResolver } from './content-items.resolver';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ContentItem',
        schema: ContentItemSchema,
        collection: 'contentItems'
      }
    ], DB_LANDINGPAGE_CONNECTION),
    StakeholdersModule,
    ProvidersModule,
    ContentTagsModule,
    AuditModule
  ],
  providers: [
    ContentItemsService,
    ContentItemsResolver
  ],
  exports: [
    ContentItemsService,
    ContentItemsResolver
  ]
})

export class ContentItemsModule {}
