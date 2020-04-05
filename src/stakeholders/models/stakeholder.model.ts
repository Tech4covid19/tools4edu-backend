import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Stakeholder {
  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}

@InputType()
export class StakeholderInputCreate {
  @Field()
  code: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}
