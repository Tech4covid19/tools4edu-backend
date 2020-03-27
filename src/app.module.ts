import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { VideosModule } from './videos/videos.module';
import { StakeholdersModule } from './stakeholders/stakeholders.module';
import { ProvidersModule } from './providers/providers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development']
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    VideosModule,
    StakeholdersModule,
    ProvidersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
