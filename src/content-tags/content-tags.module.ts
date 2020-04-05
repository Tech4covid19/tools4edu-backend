import { Module } from '@nestjs/common';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentTagsService } from './content-tags.service';
import { ContentTagsResolver } from './content-tags.resolver';
import { ContentTagSchema } from './schemas/content-tags.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ContentTag',
        schema: ContentTagSchema,
        collection: 'contentTags'
      }
    ], DB_LANDINGPAGE_CONNECTION)
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
