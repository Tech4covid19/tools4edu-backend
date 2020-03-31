import { Field, ObjectType, ID, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field(() => ID)
  id: string;

  @Field( type => Int )
  order: number;

  @Field()
  videoUrl: string;

  @Field()
  time: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(type => ID)
  stakeholder: string;
}

@InputType()
export class VideoInputCreate {
  @Field(type => Int)
  order: number;

  @Field()
  videoUrl: string;

  @Field()
  time: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  stakeholderId: string;
}

@InputType()
export class VideoInputUpdate {
  @Field(type => Int, { nullable: true })
  order: number;

  @Field({ nullable: true })
  videoUrl: string;

  @Field({ nullable: true })
  time: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  stakeholderId: string;
}