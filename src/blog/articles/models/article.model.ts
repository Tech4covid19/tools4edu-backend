import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlogArticle {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  summary: string;

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

  @Field(() => Float, { nullable: true })
  score?: number;

  @Field({ nullable: true })
  videoUrl: string;
}

@InputType()
export class BlogArticleInputCreate {
  @Field()
  title: string;

  @Field()
  summary: string;

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

  @Field({ nullable: true })
  videoUrl: string;
}

@InputType()
export class BlogArticleInputUpdate {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  summary?: string;

  @Field({ nullable: true })
  author?: string;

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  published?: boolean;

  @Field({ nullable: true })
  videoUrl: string;
}
