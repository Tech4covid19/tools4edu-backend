import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Video } from '../../videos/models/video.model';

@ObjectType()
export class Provider {
  @Field(() => ID)
  id: string;

  @Field( type => Int )
  order: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(type => [Video])
  videos: Video[]
}