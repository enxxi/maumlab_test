import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { SurveyRepository } from './survey.repository';
import { checkEntity, handleServiceError } from 'src/utils/commonFunction';
import { QuestionRepository } from '../question/question.repository';
import { ResponseRepository } from '../response/response.repository';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(
    private surveyRepository: SurveyRepository,
    private questionRepository: QuestionRepository,
    private responseRepository: ResponseRepository,
  ) {}

  async createSurvey(createSurveyInput: CreateSurveyInput) {
    try {
      return await this.surveyRepository.createSurvey(createSurveyInput);
    } catch (error) {
      handleServiceError(this.logger, error, '설문지 생성에 실패했습니다.');
    }
  }

  async findAllSurveys() {
    try {
      return await this.surveyRepository.findAllSurveys();
    } catch (error) {
      handleServiceError(
        this.logger,
        error,
        '설문지 전체 목록 조회에 실패했습니다.',
      );
    }
  }

  async findCompletedSurveys() {
    try {
      return await this.surveyRepository.findCompletedSurveys();
    } catch (error) {
      handleServiceError(
        this.logger,
        error,
        '완료된 설문지 목록 조회에 실패했습니다.',
      );
    }
  }

  async findSurvey(id: number) {
    try {
      await checkEntity(this.surveyRepository, id, '설문지');
      return await this.surveyRepository.findByIdWithQuestions(id);
    } catch (error) {
      handleServiceError(this.logger, error, '설문지 조회에 실패했습니다.');
    }
  }

  async updateSurvey(id: number, updateSurveyInput: UpdateSurveyInput) {
    try {
      const survey = await checkEntity(this.surveyRepository, id, '설문지');

      return await this.surveyRepository.updateSurvey(
        survey,
        updateSurveyInput,
      );
    } catch (error) {
      handleServiceError(this.logger, error, '설문지 수정에 실패했습니다.');
    }
  }

  async deleteSurvey(id: number) {
    try {
      await checkEntity(this.surveyRepository, id, '설문지');
      return await this.surveyRepository.deleteSurvey(id);
    } catch (error) {
      handleServiceError(this.logger, error, '설문지 삭제에 실패했습니다.');
    }
  }

  async getSurveyScore(id: number) {
    try {
      let totalScore = 0;

      await checkEntity(this.surveyRepository, id, '설문지');
      const questions = await this.questionRepository.findBySurveyId(id);
      if (questions.length === 0) {
        return totalScore;
      }
      const responses = await this.responseRepository.findByQuestionIds(
        questions.map((q) => q.id),
      );

      for (const response of responses) {
        totalScore += response.option.score;
      }

      return totalScore;
    } catch (error) {
      handleServiceError(this.logger, error, '총점 계산에 실패했습니다.');
    }
  }
}
