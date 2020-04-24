import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Stakeholder } from './models/stakeholder.model';
import { StakeholdersService } from './stakeholders.service';

@Resolver(of => Stakeholder)
export class StakeholdersResolver {
  constructor(
    private stakeholdersService: StakeholdersService
  ) {}

  @Query(() => [Stakeholder], { nullable: 'itemsAndList' })
  async stakeholders(
    @Args('onlyPublished', { nullable: true }) onlyPublished: boolean
  ) {
    let query = {}

    if (onlyPublished !== undefined) {
      query = { ...query, published: onlyPublished }
    }

    return this.stakeholdersService.findAll(query);
  }

  @Query(returns => Stakeholder)
  async stakeholder(
    @Args('code') code: string
  ) {
    return this.stakeholdersService.findOneByQuery({
      code: code
    });
  }
}
