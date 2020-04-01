import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';
import { BlogArticleSchema } from './schemas/articles.schema';
import { DB_BLOG_CONNECTION, BLOG_ARTICLE_MODEL } from '../../constants';
import { DatabaseModule } from '../../database/database.module';

export const blogArticlesProviders = [
  {
    provide: BLOG_ARTICLE_MODEL,
    useFactory: (connection: Connection) => connection.model('Article', BlogArticleSchema),
    inject: [DB_BLOG_CONNECTION]
  }
];

@Module({
  imports: [DatabaseModule],
  providers: [
    ...blogArticlesProviders,
    ArticlesService,
    ArticlesResolver
  ],
  exports: [
    ...blogArticlesProviders,
    ArticlesService,
    ArticlesResolver
  ]
})
export class ArticlesModule {}
