import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { StakeholdersService } from './stakeholders.service';
import { StakeholdersResolver } from './stakeholders.resolver';
import { StakeholderSchema } from './schemas/stakeholders.schema';
import { DB_CONNECTION_PROVIDER, STAKEHOLDER_MODEL } from '../constants';
import { DatabaseModule } from '../database/database.module';

export const stakeholdersProviders = [
  {
    provide: STAKEHOLDER_MODEL,
    useFactory: (connection: Connection) => connection.model('Stakeholder', StakeholderSchema),
    inject: [DB_CONNECTION_PROVIDER]
  }
];

@Module({
  imports: [DatabaseModule],
  providers: [
    ...stakeholdersProviders,
    StakeholdersService,
    StakeholdersResolver
  ]
})
export class StakeholdersModule {}
