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

  @Field({ nullable: true })
  published?: boolean;
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

  @Field()
  published: boolean;
}

@InputType()
export class StakeholderInputUpdate {
  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  published: boolean;
}
