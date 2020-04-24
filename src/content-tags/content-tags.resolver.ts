import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentTag, ContentTagInputCreate, ContentTagInputUpdate } from './models/content-tag.model';
import { ContentTagsService } from './content-tags.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/auth.guard';

@Resolver(of => ContentTag)
export class ContentTagsResolver {
  constructor(
    private contentTagsService: ContentTagsService
  ) {}

  @Query(returns => [ContentTag], { nullable: 'itemsAndList'})
  async contentTags(
    @Args('onlyPublished', { nullable: true }) onlyPublished: boolean
  ) {
    let query = {};

    if (onlyPublished !== undefined) {
      query = { ...query, published: onlyPublished }
    }

    return this.contentTagsService.findAll(query)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => ContentTag, { nullable: true })
  async contentTagCreate(@Args('input') contentTagInput: ContentTagInputCreate) {
    return this.contentTagsService.create(contentTagInput);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation( returns => ContentTag, { nullable: true })
  async contentTagUpdate(
    @Args('id') id: string,
    @Args('input') contentTagInput: ContentTagInputUpdate
  ) {
    return this.contentTagsService.update(id, contentTagInput)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => ContentTag, { nullable: true })
  async contentTagDelete(
    @Args('id') id: string
  ) {
    return this.contentTagsService.delete(id)
  }
}
