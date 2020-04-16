import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';
import { BlogArticleSchema } from './schemas/articles.schema';
import { DB_BLOG_CONNECTION } from '../../constants';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditModule } from '../../audit/audit.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'BlogArticle',
        schema: BlogArticleSchema,
        collection: 'articles'
      }
    ], DB_BLOG_CONNECTION),
    AuditModule,
    AuthModule
  ],
  providers: [
    ArticlesService,
    ArticlesResolver
  ],
  exports: [
    ArticlesService,
    ArticlesResolver
  ]
})
export class ArticlesModule {}
