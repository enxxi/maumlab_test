import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOptionInput {
  @Field(() => String, { description: '선택지의 내용' })
  content: string;

  @Field(() => Int, { description: '선택지의 점수' })
  score: number;

  @Field(() => Int, { description: '문항의 id' })
  questionId: number;
}
