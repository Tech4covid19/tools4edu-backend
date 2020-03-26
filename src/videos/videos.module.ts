import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosResolver } from './videos.resolver';
import { DB_CONNECTION_PROVIDER, VIDEOS_MODEL } from '../constants';
import { Connection } from 'mongoose';
import { VideoSchema } from './schemas/videos.schema';
import { DatabaseModule } from '../database/database.module';

export const videosProviders = [
  {
    provide: VIDEOS_MODEL,
    useFactory: (connection: Connection) => connection.model('Video', VideoSchema),
    inject: [DB_CONNECTION_PROVIDER]
  }
];

@Module({
  imports: [DatabaseModule],
  providers: [
    ...videosProviders,
    VideosService,
    VideosResolver
  ]
})
export class VideosModule {}
