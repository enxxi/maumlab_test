import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  async createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    // 질문 생성
    return await this.questionService.createQuestion(createQuestionInput);
  }

  @Query(() => [Question], { name: 'questions' })
  async findAllSurveys() {
    // 모든 질문 조회
    return await this.questionService.findAllSurveys();
  }

  @Query(() => Question, { name: 'question' })
  async findQuestion(@Args('id', { type: () => Int }) id: number) {
    // 개별 질문 조회
    return this.questionService.findQuestion(id);
  }

  @Mutation(() => Question)
  async updateQuestion(
    // 질문 수정
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return await this.questionService.updateQuestion(updateQuestionInput);
  }

  @Mutation(() => Question)
  async deleteQuestion(@Args('id', { type: () => Int }) id: number) {
    // 질문 삭제
    return await this.questionService.deleteQuestion(id);
  }
}
