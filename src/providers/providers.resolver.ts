import { Args, ID, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ProvidersService } from './providers.service';
import { Provider } from './models/provider.model';
import { Video } from '../videos/models/video.model';
import { filter } from 'rxjs/operators';
import { Video as IVideo } from '../videos/interfaces/video.interface';

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
  async resolveVideos(
    @Parent() provider: Provider,
    @Args('stakeholder', { nullable: true }) stakeholderCode: string
  ) {
    let filteredVideos = [];

    const providerVideos = await this.providersService.getVideosForProvider(provider.code, !!stakeholderCode);

    if (stakeholderCode) {
      filteredVideos = providerVideos.filter(video => video.stakeholder['code'] === stakeholderCode)
    } else {
      filteredVideos = [].concat(providerVideos);
    }

    return Promise.resolve(filteredVideos)
  }

  //
  // @ResolveField()
  // async videos(@Parent() provider: Provider) {
  //   const { id } = provider;
  //   return this.providersService.getVideosForProvider(id)
  // }

}