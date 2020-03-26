import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Stakeholder } from '../../stakeholders/models/stakeholder.model';

@ObjectType()
export class Video {
  @Field(() => ID)
  id: string;

  @Field( type => Int )
  order: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(type => Stakeholder)
  stakeholder: Stakeholder
}