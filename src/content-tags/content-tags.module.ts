import { Module } from '@nestjs/common';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentTagsService } from './content-tags.service';
import { ContentTagsResolver } from './content-tags.resolver';
import { ContentTagSchema } from './schemas/content-tags.schema';
import { AuditModule } from '../audit/audit.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ContentTag',
        schema: ContentTagSchema,
        collection: 'contentTags'
      }
    ], DB_LANDINGPAGE_CONNECTION),
    AuditModule
  ],
  providers: [
    ContentTagsService,
    ContentTagsResolver
  ],
  exports: [
    ContentTagsService,
    ContentTagsResolver
  ]
})
export class ContentTagsModule {}
