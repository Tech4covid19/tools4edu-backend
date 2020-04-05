import { Args, Info, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentItem, ContentItemInputCreate, ContentItemInputUpdate } from './models/content-item.model';
import { ContentItemsService } from './content-items.service';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { ProvidersService } from '../providers/providers.service';
import { ContentTagsService } from '../content-tags/content-tags.service';
import { Stakeholder } from '../stakeholders/models/stakeholder.model';
import { Provider } from '../providers/models/provider.model';
import { ContentTag } from '../content-tags/models/content-tag.model';
import { IContentItem } from './interfaces/content-item.interface';

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
    private contentTagsService: ContentTagsService
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
  ) {

    const query = getFilterQuery(
      stakeholderIds,
      providerIds,
      tagIds
    );

    return this.contentItemsService.findAll(query, limit, startAt);
  }

  @ResolveField('totalCount', () => Int, { nullable: true })
  async totalCount(
    @Parent() contentItem: IContentItem
  ) {
    const query = getFilterQuery(
      contentItem.stakeholders,
      contentItem.providers,
      contentItem.tags
    );
    return this.contentItemsService.countDocs(query);
  }

  @ResolveField('stakeholders', () => [Stakeholder], { nullable: true })
  async resolveStakeholders(
    @Parent() contentItem: IContentItem
  ) {
    if (contentItem.stakeholders && contentItem.stakeholders.length > 0) {
      return this.stakeholdersService.findAll({ _id: { $in: contentItem.stakeholders }})
    } else {
      return []
    }
  }

  @ResolveField('providers', () => [Provider], { nullable: true })
  async resolveProviders(
    @Parent() contentItem: IContentItem
  ) {
    if (contentItem.providers && contentItem.providers.length > 0) {
      return this.providersService.findAll({ _id: { $in: contentItem.providers }})
    } else {
      return []
    }
  }

  @ResolveField('tags', () => [ContentTag], { nullable: true })
  async resolveTags(
    @Parent() contentItem: IContentItem
  ) {
    if (contentItem.tags && contentItem.tags.length > 0) {
      return this.contentTagsService.findAll({ _id: { $in: contentItem.tags }})
    } else {
      return []
    }
  }

  @Mutation(() => ContentItem, { nullable: true })
  async contentItemCreate(
    @Args('input') contentItemCreate: ContentItemInputCreate
  ) {
    return this.contentItemsService.create(contentItemCreate)
  }

  @Mutation(() => ContentItem, { nullable: true })
  async contentItemUpdate(
    @Args('id') id: string,
    @Args('input') contentItem: ContentItemInputUpdate
  ) {
    return this.contentItemsService.update(id, contentItem);
  }

  @Mutation(() => ContentItem, { nullable: true })
  async contentItemDelete(
    @Args('id') id: string
  ) {
    return this.contentItemsService.delete(id)
  }
}
