import { Module } from '@nestjs/common';
import { StakeholdersService } from './stakeholders.service';
import { StakeholdersResolver } from './stakeholders.resolver';
import { StakeholderSchema } from './schemas/stakeholders.schema';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Stakeholder',
        schema: StakeholderSchema,
        collection: 'stakeholders'
      }
    ], DB_LANDINGPAGE_CONNECTION)
  ],
  providers: [
    // ...stakeholdersProviders,
    StakeholdersService,
    StakeholdersResolver
  ],
  exports: [
    // ...stakeholdersProviders,
    StakeholdersService,
    StakeholdersResolver
  ]
})
export class StakeholdersModule {}
