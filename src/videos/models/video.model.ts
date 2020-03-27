import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field(() => ID)
  id: string;

  @Field( type => Int )
  order: number;

  @Field()
  videoUrl: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(type => ID)
  stakeholder: string;
}