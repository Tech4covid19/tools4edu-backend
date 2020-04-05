import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Stakeholder } from './models/stakeholder.model';
import { StakeholdersService } from './stakeholders.service';

@Resolver(of => Stakeholder)
export class StakeholdersResolver {
  constructor(
    private stakeholdersService: StakeholdersService
  ) {}

  @Query(() => [Stakeholder])
  async stakeholders() {
    return this.stakeholdersService.findAll();
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
