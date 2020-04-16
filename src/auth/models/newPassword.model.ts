import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewPasswordInput {
  @Field()
  email: string;

  @Field()
  newPassword: string;

  @Field()
  oldPassword: string;
}
