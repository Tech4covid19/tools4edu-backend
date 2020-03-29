import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Testimony {
  @Field(() => ID)
  id: string;

  @Field()
  author: string;

  @Field()
  occupation: string;

  @Field()
  text: string;
}