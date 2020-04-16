import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Provider {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field( type => Int , { nullable: true })
  order: number;

  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  published?: boolean;
}
