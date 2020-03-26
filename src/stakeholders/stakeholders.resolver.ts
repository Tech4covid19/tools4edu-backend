import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Stakeholder } from './models/stakeholder.model';
import { StakeholdersService } from './stakeholders.service';

@Resolver(of => Stakeholder)
export class StakeholdersResolver {
  constructor(
    private stakeholdersService: StakeholdersService
  ) {}

  @Query(returns => Stakeholder)
  async stakeholder(@Args('id', { type: () => ID }) id: string ) {
    return this.stakeholdersService.findOne(id);
  }
}
