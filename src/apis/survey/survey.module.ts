import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyRepository } from './survey.repository';
import { QuestionRepository } from '../question/question.repository';
import { ResponseRepository } from '../response/response.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  providers: [
    SurveyResolver,
    SurveyService,
    SurveyRepository,
    QuestionRepository,
    ResponseRepository,
  ],
})
export class SurveyModule {}
