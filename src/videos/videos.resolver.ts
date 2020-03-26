import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './models/video.model';

@Resolver(of => Video)
export class VideosResolver {
  constructor(
    private videosService: VideosService
  ) {}

  @Query(returns => Video)
  async video(@Args('id', { type: () => ID }) id: string) {
    return this.videosService.findOne(id)
  }
}
