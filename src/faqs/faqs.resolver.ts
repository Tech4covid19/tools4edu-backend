import { Faq, FaqInputCreate, FaqInputUpdate } from './models/faq.model';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { FaqsService } from './faqs.service';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { Stakeholder } from '../stakeholders/models/stakeholder.model';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/auth.guard';

@Resolver(of => Faq)
export class FaqsResolver {
  constructor(
    private faqsService: FaqsService,
    private stakeholdersService: StakeholdersService
  ) {}

  @Query(returns => Faq)
  async faq(
    @Args('id', { type: () => ID }) id: string
  ) {
    return this.faqsService.findOne(id)
  }

  @Query(returns => [Faq])
  async faqs(
    @Args('stakeholder', { nullable: true }) stakeholderCode: string
  ) {
    const foundStakeholder = await this.stakeholdersService.findOneByQuery({ code: stakeholderCode });

    if (foundStakeholder) {
      return this.faqsService.findAll({ stakeholder: Types.ObjectId(foundStakeholder.id) });
    } else {
      return this.faqsService.findAll();
    }

  }

  @ResolveField('stakeholder', type => Stakeholder, {})
  async resolveStakeholder(@Parent() faq: Faq) {
    return this.stakeholdersService.findOne(faq.stakeholder)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Faq, { nullable: true })
  async faqCreate(
    @Args('input') faqInputCreate: FaqInputCreate
  ) {
    return this.faqsService.create(faqInputCreate)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Faq, { nullable: true })
  async faqUpdate(
    @Args('id') id: string,
    @Args('input') faqInputUpdate: FaqInputUpdate
  ) {
    return this.faqsService.update(id, faqInputUpdate)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Faq, { nullable: true })
  async faqDelete(
    @Args('id') id: string
  ) {
    return this.faqsService.delete(id)
  }
}