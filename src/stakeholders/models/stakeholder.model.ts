import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

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