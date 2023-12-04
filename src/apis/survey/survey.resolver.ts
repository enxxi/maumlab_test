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
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ) {
    return await this.surveyService.createSurvey(createSurveyInput);
  }

  @Query(() => [Survey], { name: 'surveys' })
  async findAllSurveys() {
    return await this.surveyService.findAllSurveys();
  }

  @Query(() => Survey, { name: 'survey' })
  findSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.findSurvey(id);
  }

  @Mutation(() => Survey)
  async updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ) {
    return await this.surveyService.updateSurvey(
      updateSurveyInput.id,
      updateSurveyInput,
    );
  }

  @Mutation(() => Survey)
  async deleteSurvey(@Args('id', { type: () => Int }) id: number) {
    return await this.surveyService.deleteSurvey(id);
  }
}
