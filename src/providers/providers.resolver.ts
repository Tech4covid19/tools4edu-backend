import { Args, ID, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ProvidersService } from './providers.service';
import { Provider } from './models/provider.model';
import { Video } from '../videos/models/video.model';

@Resolver(of => Provider)
export class ProvidersResolver {
  constructor(
    private providersService: ProvidersService
  ) {}

  @Query(returns => Provider)
  async provider(@Args('code') code: string) {
    return this.providersService.findOneByCode(code);
  }

  @ResolveField('videos', type => [Video], {})
  async resolveVideos(@Parent() provider: Provider) {
    return this.providersService.getVideosForProvider(provider.code)
  }

  //
  // @ResolveField()
  // async videos(@Parent() provider: Provider) {
  //   const { id } = provider;
  //   return this.providersService.getVideosForProvider(id)
  // }

}