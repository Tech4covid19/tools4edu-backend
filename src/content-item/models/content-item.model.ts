import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Stakeholder } from '../../stakeholders/models/stakeholder.model';
import { Stakeholder as IStakeholder } from '../../stakeholders/interfaces/stakeholder.interface';
import { Provider } from '../../providers/models/provider.model';
import { Provider as IProvider } from '../../providers/interfaces/provider.interface';
import { ContentTag } from '../../content-tags/models/content-tag.model';
import { ContentTag as IContentTag } from '../../content-tags/interfaces/content-tag.interface';

@ObjectType()
export class ContentItem {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field({ nullable: true })
  videoTime?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  published?: boolean;

  @Field(() => [Stakeholder], { nullable: 'itemsAndList' })
  stakeholders?: IStakeholder[];

  @Field( () => [Provider], { nullable: 'itemsAndList' })
  providers?: IProvider[];

  @Field(() => [ContentTag], { nullable: 'itemsAndList' })
  tags?: IContentTag[];

  @Field(() => Int, { nullable: true })
  totalCount: number;
}

@InputType()
export class ContentItemInputCreate {

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field({ nullable: true })
  videoTime?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  published: boolean;

  @Field(() => [String], { nullable: 'itemsAndList' })
  stakeholderIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  providerIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  tagIds?: string[];
}

@InputType()
export class ContentItemInputUpdate {
  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field({ nullable: true })
  videoTime?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  published?: boolean;

  @Field(() => [String], { nullable: 'itemsAndList' })
  stakeholderIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  providerIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  tagIds?: string[];
}
