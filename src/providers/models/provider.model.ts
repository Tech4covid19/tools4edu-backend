import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Video } from '../../videos/interfaces/video.interface';

@ObjectType()
export class Provider {
  @Field(() => ID)
  id: string;

  @Field( type => Int )
  order: number;

  @Field()
  code: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(type => [ID])
  videos: string[]
}