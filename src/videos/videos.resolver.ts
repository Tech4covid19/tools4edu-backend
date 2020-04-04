import { Args, ID, Mutation, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video, VideoInputCreate, VideoInputUpdate } from './models/video.model';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { Stakeholder } from '../stakeholders/models/stakeholder.model';
import { GraphQLAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

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
  async videos(
    @Args('stakeholder', { nullable: true }) stakeholderCode: string
  ) {

    if (stakeholderCode) {
      const foundStakeholder = await this.stakeholdersService.findOneByQuery({ code: stakeholderCode });

      if (foundStakeholder) {
        return this.videosService.findAll({ stakeholder: foundStakeholder['id'] })
      }
    }


    return this.videosService.findAll()
  }

  @ResolveField('stakeholder', type => Stakeholder, {})
  async resolveStakeholder(@Parent() video: Video) {
    return this.stakeholdersService.findOne(video.stakeholder)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Video, { nullable: true })
  async videoCreate(
    @Args('input') videoInputCreate: VideoInputCreate
  ) {
    return this.videosService.create(videoInputCreate)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Video, { nullable: true })
  async videoUpdate(
    @Args('id') id: string,
    @Args('input') videoInputUpdate: VideoInputUpdate
  ) {
    return this.videosService.update(id, videoInputUpdate)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Video, { nullable: true })
  async videoDelete(
    @Args('id') id: string
  ) {
    return this.videosService.delete(id)
  }

}
