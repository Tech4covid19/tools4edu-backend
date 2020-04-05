import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProvidersService } from './providers.service';
import { Provider } from './models/provider.model';
import { Video } from '../videos/models/video.model';

@Resolver(of => Provider)
export class ProvidersResolver {
  constructor(
    private providersService: ProvidersService
  ) {}

  @Query(returns => [Provider], { nullable: true })
  async providers(@Args('code', { nullable: true }) code: string) {
    let query = {};

    if (code) {
      query = { code: code }
    }

    return this.providersService.findAll(query);
  }

  @Query(returns => Provider, { nullable: true })
  async provider(@Args('code') code: string) {
    return this.providersService.findOneByCode(code);
  }

  @ResolveField('videos', type => [Video], {nullable: true})
  async resolveVideos(
    @Parent() provider: Provider,
    @Args('stakeholder', { nullable: true }) stakeholderCode: string
  ) {
    let filteredVideos = [];

    const providerVideos = await this.providersService.getVideosForProvider(provider.code, !!stakeholderCode);

    if (!providerVideos) return Promise.resolve([]);

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
