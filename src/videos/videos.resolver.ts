import { Args, ID, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './models/video.model';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { Stakeholder } from '../stakeholders/models/stakeholder.model';

@Resolver(of => Video)
export class VideosResolver {
  constructor(
    private videosService: VideosService,
    private stakeholdersService: StakeholdersService
  ) {}

  @Query(returns => Video)
  async video(@Args('id', { type: () => ID }) id: string) {
    return this.videosService.findOne(id)
  }

  @Query(returns => [Video])
  async videos() {
    return this.videosService.findAll()
  }

  @ResolveField('stakeholder', type => Stakeholder, {})
  async resolveStakeholder(@Parent() video: Video) {
    return this.stakeholdersService.findOne(video.stakeholder)
  }

}
