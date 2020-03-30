import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { TestimoniesService } from './testimonies.service';
import { TestimoniesResolver } from './testimonies.resolver';
import { TestimonySchema } from './schemas/testimonies.schema';
import { DB_LANDINGPAGE_CONNECTION, TESTIMONIES_MODEL } from '../constants';
import { DatabaseModule } from '../database/database.module';

export const testimoniesProviders = [
  {
    provide: TESTIMONIES_MODEL,
    useFactory: (connection: Connection) => connection.model('Testimony', TestimonySchema),
    inject: [DB_LANDINGPAGE_CONNECTION]
  }
];

@Module({
  imports: [DatabaseModule],
  providers: [
    ...testimoniesProviders,
    TestimoniesService,
    TestimoniesResolver
  ],
  exports: [
    ...testimoniesProviders,
    TestimoniesService,
    TestimoniesResolver
  ]
})
export class TestimoniesModule {}
