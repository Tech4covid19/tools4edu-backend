import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BlogArticle, BlogArticleInputCreate, BlogArticleInputUpdate } from './models/article.model';
import { ArticlesService } from './articles.service';


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

  @Mutation(returns => BlogArticle, { nullable: true })
  async blogArticleCreate(
    @Args('input') blogArticleInput: BlogArticleInputCreate
  ) {
    return this.articlesService.create(blogArticleInput);
  }

  @Mutation(returns => BlogArticle, { nullable: true })
  async blogArticleUpdate(
    @Args('id') id: string,
    @Args('input') blogArticleInput: BlogArticleInputUpdate
  ) {
    return this.articlesService.update(id, blogArticleInput)
  }

  @Mutation(returns => BlogArticle, { nullable: true })
  async blogArticleDelete(
    @Args('id') id: string
  ) {
    return this.articlesService.delete(id);
  }
}