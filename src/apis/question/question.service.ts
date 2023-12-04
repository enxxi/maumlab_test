import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionRepository } from './question.repository';
import { Survey } from '../survey/entities/survey.entity';
import { SurveyRepository } from '../survey/survey.repository';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  constructor(
    private questionRepository: QuestionRepository,
    private surveyRepository: SurveyRepository,
  ) {}

  async createQuestion(createQuestionInput: CreateQuestionInput) {
    try {
      const { content, surveyId } = createQuestionInput;
      const survey = await this.checkSurvey(surveyId);

      return await this.questionRepository.createQuestion(content, survey);
    } catch (error) {
      this.logger.error(`${error}`);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('질문 생성에 실패하였습니다.');
      }
    }
  }

  async findAllSurveys() {
    try {
      return await this.questionRepository.findAllQuestions();
    } catch (error) {
      this.logger.error(`${error}`);

      throw new InternalServerErrorException('질문 목록 조회에 실패했습니다.');
    }
  }

  async findQuestion(id: number) {
    try {
      // 문항에 포함된 선택지들과 함께 반환
      return await this.questionRepository.findByIdWithOptions(id);
    } catch (error) {
      this.logger.error(`${error}`);

      throw new InternalServerErrorException('질문 조회에 실패했습니다.');
    }
  }

  async updateQuestion(updateQuestionInput: UpdateQuestionInput) {
    try {
      const question = await this.checkQuestion(updateQuestionInput.id);

      return await this.questionRepository.updateQuestion(
        question,
        updateQuestionInput,
      );
    } catch (error) {
      this.logger.error(`${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('질문 수정에 실패하였습니다.');
      }
    }
  }

  async deleteQuestion(id: number) {
    try {
      await this.checkQuestion(id);
      return await this.questionRepository.deleteQuestion(id);
    } catch (error) {
      this.logger.error(`${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('질문 삭제에 실패하였습니다.');
      }
    }
  }

  private async checkSurvey(id) {
    const survey = await this.surveyRepository.findById(id);
    if (!survey) {
      throw new NotFoundException('해당 id의 설문지를 찾을 수 없습니다.');
    }
    return survey;
  }

  private async checkQuestion(id) {
    const question = await this.questionRepository.findById(id);
    if (!question) {
      throw new NotFoundException('해당 id의 질문을 찾을 수 없습니다.');
    }
    return question;
  }
}
