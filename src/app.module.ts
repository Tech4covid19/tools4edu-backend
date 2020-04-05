import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { VideosModule } from './videos/videos.module';
import { StakeholdersModule } from './stakeholders/stakeholders.module';
import { ProvidersModule } from './providers/providers.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TestimoniesModule } from './testimonies/testimonies.module';
import { FaqsModule } from './faqs/faqs.module';
import { BlogModule } from './blog/blog.module';
import { DatabaseModule } from './database/database.module';
import { ContentTagsModule } from './content-tags/content-tags.module';
import { ContentItemsModule } from './content-item/content-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development']
    }),
  
    GraphQLModule.forRootAsync({
      useFactory: () => {
        // const schemaModuleOptions: Partial<GqlModuleOptions> = {};

        return {
          context: ({ req }) => ({ req }),
          playground: true, // Allow playground in production
          introspection: true, // Allow introspection in production
          autoSchemaFile: true,
          cors: true,
        };
      },
    }),
    DatabaseModule,
    AuthModule,
    VideosModule,
    StakeholdersModule,
    ProvidersModule,
    TestimoniesModule,
    FaqsModule,
    ContentTagsModule,
    BlogModule,
    ContentItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
