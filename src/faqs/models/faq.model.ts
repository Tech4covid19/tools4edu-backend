import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Faq {
  @Field(() => ID)
  id: string;

  @Field( type => Int )
  order: number;

  @Field()
  question: string;

  @Field()
  answer: string;

  @Field()
  published: boolean;

  @Field(type => ID)
  stakeholder: string;

  @Field(type => ID)
  provider: string;
}

@InputType()
export class FaqInputCreate {
  @Field( type => Int )
  order: number;

  @Field()
  question: string;

  @Field()
  answer: string;

  @Field()
  published: boolean;

  @Field()
  stakeholderId: string;

  @Field()
  providerId: string;
}

@InputType()
export class FaqInputUpdate {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field( type => Int, { nullable: true } )
  order: number;

  @Field({ nullable: true })
  question: string;

  @Field({ nullable: true })
  answer: string;

  @Field({ nullable: true })
  published: boolean;

  @Field({ nullable: true })
  stakeholderId: string;

  @Field({ nullable: true })
  providerId: string;
}
