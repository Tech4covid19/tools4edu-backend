import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  IdToken: string;

  @Field()
  AccessToken: string;

  @Field()
  RefreshToken: string;
}