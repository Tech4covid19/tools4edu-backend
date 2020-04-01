import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlogArticle {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => [String])
  images: string[];

  @Field()
  text: string;

  @Field()
  slug: string;

  @Field()
  published: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class BlogArticleInputCreate {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => [String])
  images: string[];

  @Field()
  text: string;

  @Field()
  slug: string;

  @Field()
  published: boolean;
}

@InputType()
export class BlogArticleInputUpdate {
  @Field()
  title?: string;

  @Field()
  author?: string;

  @Field(() => [String])
  images?: string[];

  @Field()
  text?: string;

  @Field()
  slug?: string;

  @Field()
  published?: boolean;
}