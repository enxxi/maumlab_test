import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Survey } from '../survey/entities/survey.entity';
import { SurveyRepository } from '../survey/survey.repository';
import { QuestionRepository } from './question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Survey])],
  providers: [
    QuestionResolver,
    QuestionService,
    SurveyRepository,
    QuestionRepository,
  ],
})
export class QuestionModule {}
