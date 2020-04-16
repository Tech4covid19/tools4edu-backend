import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { BlogArticle, BlogArticleInputCreate, BlogArticleInputUpdate } from './models/article.model';
import { ArticlesService } from './articles.service';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../../auth/auth.guard';


@Resolver(of => BlogArticle)
export class ArticlesResolver {
  constructor(
    private articlesService: ArticlesService
  ) {}

  @Query(returns => [BlogArticle])
  async blogArticles() {
    return this.articlesService.findAll()
  }

  @Query(returns => BlogArticle)
  async blogArticle(
    @Args('slug') slug: string
  ) {
    return this.articlesService.findOneByQuery({ slug: slug })
  }

  @ResolveField('createdAt', () => Date, { nullable: true })
  async createdAtResolver(@Parent() blogArticle: BlogArticle) {
    return Types.ObjectId(blogArticle.id).getTimestamp();
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => BlogArticle, { nullable: true })
  async blogArticleCreate(
    @Args('input') blogArticleInput: BlogArticleInputCreate
  ) {
    return this.articlesService.create(blogArticleInput);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => BlogArticle, { nullable: true })
  async blogArticleUpdate(
    @Args('id') id: string,
    @Args('input') blogArticleInput: BlogArticleInputUpdate
  ) {
    return this.articlesService.update(id, blogArticleInput)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => BlogArticle, { nullable: true })
  async blogArticleDelete(
    @Args('id') id: string
  ) {
    return this.articlesService.delete(id);
  }
}
