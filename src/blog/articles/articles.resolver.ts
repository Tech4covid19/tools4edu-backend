import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
  Context,
  Info,
} from '@nestjs/graphql';
import { BlogArticle, BlogArticleInputCreate, BlogArticleInputUpdate } from './models/article.model';
import { ArticlesService } from './articles.service';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../../auth/auth.guard';
import { AuditService } from '../../audit/audit.service';
import { Faq } from '../../faqs/models/faq.model';


@Resolver(of => BlogArticle)
export class ArticlesResolver {
  constructor(
    private articlesService: ArticlesService,
    private auditService: AuditService
  ) {}

  @Query(() => [BlogArticle], { nullable: 'itemsAndList' })
  async blogArticleSearch(
    @Args('term') term: string,
    @Args('limit', { nullable: true }) limit: number,
    @Args('startAt', { nullable: true }) startAt: number
  ) {
    return this.articlesService.search(term, limit, startAt);
  }

  @Query(returns => [BlogArticle])
  async blogArticles(
    @Args('limit', { nullable: true }) limit: number,
    @Args('startAt', { nullable: true }) startAt: number,
    @Args('onlyPublished', { nullable: true }) onlyPublished: boolean,
    @Args('searchTerm', { nullable: true }) searchTerm: string
  ) {
    let query = {}

    if (onlyPublished !== undefined) {
      query = { published: onlyPublished }
    }

    if (searchTerm && searchTerm.length > 0) {
      query = Object.assign({}, query, { $text: { $search: searchTerm }} )
    }

    return this.articlesService.findAll(query, limit, startAt);
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
    @Args('input') blogArticleInput: BlogArticleInputCreate,
    @Info() info: any,
    @Context() context: any
  ) {

    await this.auditService.create({
      action: this.auditService.CREATE_ACTION,
      mutation: info.fieldName,
      params: JSON.stringify({ blogArticleInput }),
      previousState: '',
      newState: JSON.stringify(blogArticleInput),
      token: context.token
    });

    return this.articlesService.create(blogArticleInput);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => BlogArticle, { nullable: true })
  async blogArticleUpdate(
    @Args('id') id: string,
    @Args('input') blogArticleInput: BlogArticleInputUpdate,
    @Context() context: any,
    @Info() info: any
  ) {
    const previousState = await this.articlesService.findOne(id);

    await this.auditService.create({
      action: this.auditService.UPDATE_ACTION,
      mutation: info.fieldName,
      params: JSON.stringify({ id, blogArticleInput }),
      previousState: JSON.stringify(previousState),
      newState: JSON.stringify(Object.assign({}, previousState, blogArticleInput)),
      token: context.token
    });

    return this.articlesService.update(id, blogArticleInput)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => BlogArticle, { nullable: true })
  async blogArticleDelete(
    @Args('id') id: string,
    @Info() info: any,
    @Context() context: any
  ) {
    const previousState = await this.articlesService.findOne(id);

    await this.auditService.create({
      action: this.auditService.DELETE_ACTION,
      mutation: info.fieldName,
      params: '',
      previousState: JSON.stringify(previousState),
      newState: '',
      token: context.token
    });

    return this.articlesService.delete(id);
  }
}
