import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { SurveyRepository } from './survey.repository';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(private surveyRepository: SurveyRepository) {}

  async createSurvey(createSurveyInput: CreateSurveyInput) {
    try {
      return await this.surveyRepository.createSurvey(createSurveyInput);
    } catch (error) {
      this.logger.error(`${error}`);

      throw new InternalServerErrorException('설문지 생성에 실패하였습니다.');
    }
  }

  async findAllSurveys() {
    try {
      return await this.surveyRepository.findAllSurveys();
    } catch (error) {
      this.logger.error(`${error}`);

      throw new InternalServerErrorException(
        '설문지 목록 조회에 실패했습니다.',
      );
    }
  }

  async findSurvey(id: number) {
    try {
      return await this.surveyRepository.findByIdWithQuestions(id);
    } catch (error) {
      this.logger.error(`${error}`);

      throw new InternalServerErrorException('설문지 조회에 실패했습니다.');
    }
  }

  async updateSurvey(id: number, updateSurveyInput: UpdateSurveyInput) {
    try {
      const survey = await this.checkSurvey(id);

      await this.surveyRepository.updateSurvey(survey, updateSurveyInput);

      return { message: '설문지 수정에 성공하였습니다.' };
    } catch (error) {
      this.logger.error(`${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('설문지 수정에 실패하였습니다.');
      }
    }
  }

  async deleteSurvey(id: number) {
    try {
      await this.checkSurvey(id);
      return await this.surveyRepository.deleteSurvey(id);
    } catch (error) {
      this.logger.error(`${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('설문지 삭제에 실패하였습니다.');
      }
    }
  }

  async checkSurvey(id) {
    const survey = await this.surveyRepository.findById(id);
    if (!survey) {
      throw new NotFoundException('해당 id의 설문지를 찾을 수 없습니다.');
    }
    return survey;
  }
}
