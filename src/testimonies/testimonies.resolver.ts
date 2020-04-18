import { Args, Context, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Testimony, TestimonyInputCreate, TestimonyInputUpdate } from './models/testimony.model';
import { TestimoniesService } from './testimonies.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/auth.guard';
import { AuditService } from '../audit/audit.service';

@Resolver(of => Testimony)
export class TestimoniesResolver {
  constructor(
    private testimoniesService: TestimoniesService,
    private auditService: AuditService
  ) {
  }

  @Query(returns => [Testimony])
  async testimonies() {
    return this.testimoniesService.findAll();
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Testimony, { nullable: true })
  async testimonyCreate(
    @Args('input') testimonyInput: TestimonyInputCreate,
    @Info() info: any,
    @Context() context: any
  ) {

    await this.auditService.create({
      action: this.auditService.UPDATE_ACTION,
      mutation: info.fieldName,
      params: JSON.stringify({ testimonyInput }),
      previousState: '',
      newState: JSON.stringify(testimonyInput),
      token: context.token
    });

    return this.testimoniesService.create(testimonyInput);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation( returns => Testimony, { nullable: true })
  async testimonyUpdate(
    @Args('id') id: string,
    @Args('input') testimonyInput: TestimonyInputUpdate,
    @Info() info: any,
    @Context() context: any
  ) {

    const previousState = await this.testimoniesService.findOne(id);

    await this.auditService.create({
      action: this.auditService.UPDATE_ACTION,
      mutation: info.fieldName,
      params: JSON.stringify({ id, testimonyInput }),
      previousState: JSON.stringify(previousState),
      newState: JSON.stringify(Object.assign({}, previousState, testimonyInput)),
      token: context.token
    });

    return this.testimoniesService.update(id, testimonyInput)
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(returns => Testimony, { nullable: true })
  async testimonyDelete(
    @Args('id') id: string,
    @Info() info: any,
    @Context() context: any
  ) {
    const previousState = await this.testimoniesService.findOne(id);

    await this.auditService.create({
      action: this.auditService.DELETE_ACTION,
      mutation: info.fieldName,
      params: '',
      previousState: JSON.stringify(previousState),
      newState: '',
      token: context.token
    });

    return this.testimoniesService.delete(id)
  }
}
