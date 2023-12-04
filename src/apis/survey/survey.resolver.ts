import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Mutation(() => Survey)
  async createSurvey(
    //설문지 생성
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ) {
    return await this.surveyService.createSurvey(createSurveyInput);
  }

  @Query(() => [Survey], { name: 'surveys' })
  async findAllSurveys() {
    //설문지 목록 조회
    return await this.surveyService.findAllSurveys();
  }

  @Query(() => [Survey], { name: 'completedSurveys' })
  async findCompletedSurveys() {
    //완료된 설문지 조회
    return await this.surveyService.findCompletedSurveys();
  }

  @Query(() => Survey, { name: 'survey' })
  async findSurvey(@Args('id', { type: () => Int }) id: number) {
    // 설문지 개별 조회
    return await this.surveyService.findSurvey(id);
  }

  @Mutation(() => Survey)
  async updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ) {
    // 설문지 수정 / 완료 체크
    return await this.surveyService.updateSurvey(
      updateSurveyInput.id,
      updateSurveyInput,
    );
  }

  @Mutation(() => Survey)
  async deleteSurvey(@Args('id', { type: () => Int }) id: number) {
    // 설문지 삭제
    return await this.surveyService.deleteSurvey(id);
  }

  @Query(() => Int, { name: 'getSurveyScore' })
  async getSurveyScore(@Args('id', { type: () => Int }) id: number) {
    // 설문지 답변 총점 반환
    return this.surveyService.getSurveyScore(id);
  }
}
