import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Testimony } from './models/testimony.model';
import { TestimoniesService } from './testimonies.service';

@Resolver(of => Testimony)
export class TestimoniesResolver {
  constructor(
    private testimoniesService: TestimoniesService
  ) {}

  @Query(returns => [Testimony])
  async testimonies() {
    return this.testimoniesService.findAll();
  }
}
