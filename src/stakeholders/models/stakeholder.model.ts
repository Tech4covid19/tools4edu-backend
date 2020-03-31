import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

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
}

@InputType()
export class StakeholderInputCreate {
  @Field()
  code: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}