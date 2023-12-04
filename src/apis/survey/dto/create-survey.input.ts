import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSurveyInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
