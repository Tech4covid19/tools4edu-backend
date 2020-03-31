import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Testimony, TestimonyInputCreate, TestimonyInputUpdate } from './models/testimony.model';
import { TestimoniesService } from './testimonies.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/auth.guard';

@Resolver(of => Testimony)
export class TestimoniesResolver {
  constructor(
    private testimoniesService: TestimoniesService
  ) {
  }

  @Query(returns => [Testimony])
  async testimonies() {
    return this.testimoniesService.findAll();
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Testimony, { nullable: true })
  async testimonyCreate(@Args('input') testimonyInput: TestimonyInputCreate) {
    return this.testimoniesService.create(testimonyInput);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation( returns => Testimony, { nullable: true })
  async testimonyUpdate(
    @Args('id') id: string,
    @Args('input') testimonyInput: TestimonyInputUpdate
  ) {
    return this.testimoniesService.update(id, testimonyInput)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Testimony, { nullable: true })
  async testimonyDelete(
    @Args('id') id: string
  ) {
    return this.testimoniesService.delete(id)
  }
}
