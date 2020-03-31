import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

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

  @Field()
  published: boolean;
}

@InputType()
export class TestimonyInputCreate {
  @Field()
  author: string;

  @Field()
  occupation: string;

  @Field()
  text: string;

  @Field()
  published: boolean;
}

@InputType()
export class TestimonyInputUpdate {
  @Field({ nullable: true })
  author: string;

  @Field({ nullable: true })
  occupation: string;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  published: boolean;
}