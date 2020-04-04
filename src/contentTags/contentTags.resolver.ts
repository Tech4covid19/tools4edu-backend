import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentTag, ContentTagInputCreate, ContentTagInputUpdate } from './models/contentTag.model';
import { ContentTagsService } from './contentTags.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/auth.guard';

@Resolver(of => ContentTag)
export class ContentTagsResolver {
  constructor(
    private contentTagsService: ContentTagsService
  ) {}

  @Query(returns => [ContentTag])
  async contentTags() {
    return this.contentTagsService.findAll()
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
