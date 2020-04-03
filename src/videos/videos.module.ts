import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosResolver } from './videos.resolver';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';
import { VideoSchema } from './schemas/videos.schema';
import { StakeholdersModule } from '../stakeholders/stakeholders.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Video',
        schema: VideoSchema,
        collection: 'videos'
      }
    ], DB_LANDINGPAGE_CONNECTION),
    StakeholdersModule
  ],
  providers: [
    VideosService,
    VideosResolver
  ],
  exports: [
    VideosService,
    VideosResolver
  ]
})
export class VideosModule {}
