import { Field, ID, ObjectType } from '@nestjs/graphql';

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