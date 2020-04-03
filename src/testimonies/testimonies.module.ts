import { Module } from '@nestjs/common';
import { TestimoniesService } from './testimonies.service';
import { TestimoniesResolver } from './testimonies.resolver';
import { TestimonySchema } from './schemas/testimonies.schema';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Testimony',
        schema: TestimonySchema,
        collection: 'testimonies'
      }
    ], DB_LANDINGPAGE_CONNECTION)
  ],
  providers: [
    TestimoniesService,
    TestimoniesResolver
  ],
  exports: [
    TestimoniesService,
    TestimoniesResolver
  ]
})
export class TestimoniesModule {}
