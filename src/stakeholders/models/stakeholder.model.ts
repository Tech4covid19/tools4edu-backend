import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum StakeholderCode {
  ALUNO,
  PROFESSOR,
  PAIS
}

registerEnumType(StakeholderCode, {
  name: 'StakeholderCode'
});

@ObjectType()
export class Stakeholder {
  @Field(() => ID)
  id: string;

  @Field(type => StakeholderCode)
  code: StakeholderCode;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}