import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProvidersService } from './providers.service';
import { Provider } from './models/provider.model';

@Resolver(of => Provider)
export class ProvidersResolver {
  constructor(
    private providersService: ProvidersService
  ) {}

  @Query(returns => [Provider], { nullable: 'itemsAndList' })
  async providers(
    @Args('code', { nullable: true }) code: string,
    @Args('onlyPublished', { nullable: true }) onlyPublished: boolean
  ) {
    let query = {};

    if (code) {
      query = { code: code }
    }

    if (onlyPublished !== undefined) {
      query = { ...query, published: onlyPublished }
    }

    return this.providersService.findAll(query);
  }

  @Query(returns => Provider, { nullable: true })
  async provider(@Args('code') code: string) {
    return this.providersService.findOneByQuery({code: code});
  }

}
