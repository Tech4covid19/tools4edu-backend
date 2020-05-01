import { Faq, FaqInputCreate, FaqInputUpdate } from './models/faq.model';
import { Args, Context, ID, Info, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { FaqsService } from './faqs.service';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { Stakeholder } from '../stakeholders/models/stakeholder.model';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/auth.guard';
import { Provider } from '../providers/models/provider.model';
import { ProvidersService } from '../providers/providers.service';
import { AuditService } from '../audit/audit.service';
import { ContentItem } from '../content-item/models/content-item.model';

function getFilterQuery(stakeholderIds, providerIds) {
  let query = {};

  if (stakeholderIds && stakeholderIds.length > 0)
    query = Object.assign({}, query, { stakeholder: { $in: stakeholderIds.map(s => Types.ObjectId(s)) } });

  if (providerIds && providerIds.length > 0)
    query = Object.assign({}, query, { provider: { $in: providerIds.map(p => Types.ObjectId(p)) } });

  return query;
}

@Resolver(of => Faq)
export class FaqsResolver {
  constructor(
    private faqsService: FaqsService,
    private stakeholdersService: StakeholdersService,
    private providersService: ProvidersService,
    private auditService: AuditService
  ) {}

  @Query(() => [Faq], { nullable: 'itemsAndList' })
  async faqSearch(
    @Args('term') term: string,
    @Args('limit', { nullable: true }) limit: number,
    @Args('startAt', { nullable: true }) startAt: number
  ) {
    return this.faqsService.search(term, limit, startAt);
  }

  @Query(returns => Faq)
  async faq(
    @Args('id', { type: () => ID }) id: string
  ) {
    return this.faqsService.findOne(id)
  }

  @Query(returns => [Faq])
  async faqs(
    @Args('stakeholderIds', { type: () => [String], nullable: 'itemsAndList' }) stakeholdersIds: string[],
    @Args('providerIds', { type: () => [String], nullable: 'itemsAndList' }) providerIds: string[],
    @Args('limit', { nullable: true }) limit: number,
    @Args('startAt', { nullable: true }) startAt: number,
    @Args('onlyPublished', { nullable: true }) onlyPublished: boolean
  ) {
    let query = getFilterQuery(
      stakeholdersIds,
      providerIds
    );

    if (onlyPublished !== undefined) {
      query = { ...query, published: onlyPublished }
    }

    return this.faqsService.findAll(query, limit, startAt);
  }

  @Query(() => Int, { nullable: true })
  async faqTotalCount(
    @Args('stakeholderIds', { type: () => [String], nullable: true }) stakeholderIds: string,
    @Args('providerIds', { type: () => [String], nullable: true }) providerIds: string,
    @Args('onlyPublished', { nullable: true }) onlyPublished: boolean
  ) {
    let query = getFilterQuery(
      stakeholderIds,
      providerIds
    );

    if (onlyPublished !== undefined) {
      query = { ...query, published: onlyPublished }
    }

    return this.faqsService.countDocs(query)
  }

  @ResolveField('stakeholder', type => Stakeholder, { nullable: true })
  async resolveStakeholder(@Parent() faq: Faq) {
    if (faq.stakeholder) {
      return this.stakeholdersService.findOneByQuery({_id: faq.stakeholder})
    } else {
      return null;
    }
  }

  @ResolveField('provider', type => Provider, { nullable: true })
  async resolveProvider(@Parent() faq: Faq) {
    if (faq.provider) {
      return this.providersService.findOneByQuery({_id: faq.provider})
    } else {
      return null;
    }

  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Faq, { nullable: true })
  async faqCreate(
    @Args('input') faqInputCreate: FaqInputCreate,
    @Info() info: any,
    @Context() context: any
  ) {

    await this.auditService.create({
      action: this.auditService.CREATE_ACTION,
      mutation: info.fieldName,
      params: JSON.stringify({ faqInputCreate }),
      previousState: '',
      newState: JSON.stringify(faqInputCreate),
      token: context.token
    });

    return this.faqsService.create(faqInputCreate)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Faq, { nullable: true })
  async faqUpdate(
    @Args('id') id: string,
    @Args('input') faqInputUpdate: FaqInputUpdate,
    @Info() info: any,
    @Context() context: any
  ) {
    const previousState = await this.faqsService.findOne(id);

    await this.auditService.create({
      action: this.auditService.UPDATE_ACTION,
      mutation: info.fieldName,
      params: JSON.stringify({ id, faqInputUpdate }),
      previousState: JSON.stringify(previousState),
      newState: JSON.stringify(Object.assign({}, previousState, faqInputUpdate)),
      token: context.token
    });

    return this.faqsService.update(id, faqInputUpdate)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Faq, { nullable: true })
  async faqDelete(
    @Args('id') id: string,
    @Info() info: any,
    @Context() context: any
  ) {
    const previousState = await this.faqsService.findOne(id);

    await this.auditService.create({
      action: this.auditService.DELETE_ACTION,
      mutation: info.fieldName,
      params: '',
      previousState: JSON.stringify(previousState),
      newState: '',
      token: context.token
    });

    return this.faqsService.delete(id)
  }
}
