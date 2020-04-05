import { Args, Int, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentItem, ContentItemInputCreate, ContentItemInputUpdate } from './models/content-item.model';
import { ContentItemsService } from './content-items.service';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { ProvidersService } from '../providers/providers.service';
import { ContentTagsService } from '../content-tags/content-tags.service';
import { Stakeholder } from '../stakeholders/models/stakeholder.model';
import { Provider } from '../providers/models/provider.model';
import { ContentTag } from '../content-tags/models/content-tag.model';

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
    @Args('startAt', { nullable: true }) startAt: number
  ) {
    return this.contentItemsService.findAll({}, limit, startAt);
  }

  @Query(() => Int)
  async totalCount() {
    return this.contentItemsService.countDocs();
  }

  @ResolveField('stakeholders', () => [Stakeholder], { nullable: true })
  async resolveStakeholders(
    @Args('ids', { type: () => [String], nullable: 'itemsAndList' }) ids: string[]
  ) {
    return this.stakeholdersService.findAll({ _id: { $in: ids }})
  }

  @ResolveField('providers', () => [Provider], { nullable: true })
  async resolveProviders(
    @Args('ids', { type: () => [String], nullable: 'itemsAndList' }) ids: string[]
  ) {
    return this.providersService.findAll({ _id: { $in: ids }})
  }

  @ResolveField('tags', () => [ContentTag], { nullable: true })
  async resolveTags(
    @Args('ids', { type: () => [String], nullable: 'itemsAndList' }) ids: string[]
  ) {
    return this.contentTagsService.findAll({ _id: { $in: ids }})
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
