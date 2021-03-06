import { Args, Context, Info, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentItem, ContentItemInputCreate, ContentItemInputUpdate } from './models/content-item.model';
import { ContentItemsService } from './content-items.service';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { ProvidersService } from '../providers/providers.service';
import { ContentTagsService } from '../content-tags/content-tags.service';
import { Stakeholder } from '../stakeholders/models/stakeholder.model';
import { Provider } from '../providers/models/provider.model';
import { ContentTag } from '../content-tags/models/content-tag.model';
import { IContentItem } from './interfaces/content-item.interface';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/auth.guard';
import { AuditService } from '../audit/audit.service';

function getFilterQuery(stakeholderIds, providerIds, tagIds) {
  let query = {};

  if (stakeholderIds && stakeholderIds.length > 0)
    query = Object.assign({}, query, { stakeholders: { $in: stakeholderIds }});

  if (providerIds && providerIds.length > 0)
    query = Object.assign({}, query, { providers: { $in: providerIds }});

  if (tagIds && tagIds.length > 0)
    query = Object.assign({}, query, { tags: { $in: tagIds }});

  return query;
}

@Resolver(() => ContentItem)
export class ContentItemsResolver {
  constructor(
    private contentItemsService: ContentItemsService,
    private stakeholdersService: StakeholdersService,
    private providersService: ProvidersService,
    private contentTagsService: ContentTagsService,
    private auditService: AuditService
  ) {}

  @Query(() => ContentItem)
  async contentItem(
    @Args('slug', { nullable: true }) slug: string
  ) {
    return this.contentItemsService.findOneByQuery({ slug: slug });
  }

  @Query(() => [ContentItem])
  async contentItems(
    @Args('limit', { nullable: true }) limit: number,
    @Args('startAt', { nullable: true }) startAt: number,
    @Args('stakeholderIds', { type: () => [String], nullable: 'itemsAndList' }) stakeholderIds: string[],
    @Args('providerIds', { type: () => [String], nullable: 'itemsAndList' }) providerIds: string[],
    @Args('tagIds', { type: () => [String], nullable: 'itemsAndList' }) tagIds: string[],
    @Args('onlyPublished', { nullable: true }) onlyPublished: boolean
  ) {

    let query = getFilterQuery(
      stakeholderIds,
      providerIds,
      tagIds
    );

    if (onlyPublished !== undefined) {
      query = { ...query, published: onlyPublished }
    }

    return this.contentItemsService.findAll(query, limit, startAt);
  }

  @Query(() => Int, { nullable: true })
  async contentItemTotalCount(
    @Args('stakeholderIds', { type: () => [String], nullable: 'itemsAndList' }) stakeholderIds: string[],
    @Args('providerIds', { type: () => [String], nullable: 'itemsAndList' }) providerIds: string[],
    @Args('tagIds', { type: () => [String], nullable: 'itemsAndList' }) tagIds: string[],
    @Args('onlyPublished', { nullable: true }) onlyPublished: boolean
  ) {
    let query = getFilterQuery(
      stakeholderIds,
      providerIds,
      tagIds
    );

    if (onlyPublished !== undefined) {
      query = { ...query, published: onlyPublished }
    }

    return this.contentItemsService.countDocs(query);
  }

  @ResolveField('stakeholder', () => Stakeholder, { nullable: true })
  async resolveStakeholder(
    @Parent() contentItem: IContentItem
  ) {
    if (contentItem.type === 'CONTENT-TUTORIAL-VIDEO' && contentItem.stakeholders && contentItem.stakeholders.length > 0) {
      return this.stakeholdersService.findOneByQuery({ _id: contentItem.stakeholders[0] })
    } else {
      return null;
    }
  }

  @ResolveField('stakeholders', () => [Stakeholder],{ nullable: 'itemsAndList' })
  async resolveStakeholders(
    @Parent() contentItem: IContentItem
  ) {
    if (contentItem.stakeholders && contentItem.stakeholders.length > 0) {
      return this.stakeholdersService.findAll({ _id: { $in: contentItem.stakeholders }})
    } else {
      return null
    }
  }

  @ResolveField('provider', () => Provider, { nullable: true })
  async resolveProvider(
    @Parent() contentItem: IContentItem
  ) {
    if (contentItem.type === 'CONTENT-TUTORIAL-VIDEO' && contentItem.providers && contentItem.providers.length > 0) {
      return this.providersService.findOneByQuery({ _id: contentItem.providers[0] })
    } else {
      return null;
    }
  }

  @ResolveField('providers', () => [Provider], { nullable: 'itemsAndList' })
  async resolveProviders(
    @Parent() contentItem: IContentItem
  ) {
    if (contentItem.providers && contentItem.providers.length > 0) {
      return this.providersService.findAll({ _id: { $in: contentItem.providers }})
    } else {
      return []
    }
  }

  @ResolveField('tags', () => [ContentTag], { nullable: 'itemsAndList' })
  async resolveTags(
    @Parent() contentItem: IContentItem
  ) {
    if (contentItem.tags && contentItem.tags.length > 0) {
      return this.contentTagsService.findAll({ _id: { $in: contentItem.tags }})
    } else {
      return []
    }
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => ContentItem, { nullable: true })
  async contentItemCreate(
    @Args('input') contentItemCreate: ContentItemInputCreate,
    @Info() info: any,
    @Context() context: any
  ) {

    await this.auditService.create({
      action: this.auditService.CREATE_ACTION,
      mutation: info.fieldName,
      params: JSON.stringify({ contentItemCreate }),
      previousState: '',
      newState: JSON.stringify( contentItemCreate ),
      token: context.token
    });

    return this.contentItemsService.create(contentItemCreate)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => ContentItem, { nullable: true })
  async contentItemUpdate(
    @Args('id') id: string,
    @Args('input') contentItem: ContentItemInputUpdate,
    @Info() info: any,
    @Context() context: any
  ) {
    const previousState = await this.contentItemsService.findOneByQuery({ _id: id });

    await this.auditService.create({
      action: this.auditService.UPDATE_ACTION,
      mutation: info.fieldName,
      params: JSON.stringify({ id, contentItem }),
      previousState: JSON.stringify(previousState),
      newState: JSON.stringify(Object.assign({}, previousState, contentItem)),
      token: context.token
    });

    return this.contentItemsService.update(id, contentItem);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => ContentItem, { nullable: true })
  async contentItemDelete(
    @Args('id') id: string,
    @Info() info: any,
    @Context() context: any
  ) {

    const previousState = await this.contentItemsService.findOneByQuery({ _id: id });

    await this.auditService.create({
      action: this.auditService.DELETE_ACTION,
      mutation: info.fieldName,
      params: '',
      previousState: JSON.stringify(previousState),
      newState: '',
      token: context.token
    });

    return this.contentItemsService.delete(id)
  }
}
