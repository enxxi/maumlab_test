import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: '문항의 내용' })
  content: string;
  @Field(() => Int, { description: '설문지의 id' })
  surveyId: number;
}
