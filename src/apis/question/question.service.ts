import { Injectable, Logger } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { QuestionRepository } from './question.repository';
import { SurveyRepository } from '../survey/survey.repository';
import { checkEntity, handleServiceError } from 'src/utils/commonFunction';

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
      const survey = await checkEntity(
        this.surveyRepository,
        surveyId,
        '설문지',
      );

      return await this.questionRepository.createQuestion(content, survey);
    } catch (error) {
      handleServiceError(this.logger, error, '질문 생성에 실패했습니다.');
    }
  }

  async findAllSurveys() {
    try {
      return await this.questionRepository.findAllQuestions();
    } catch (error) {
      handleServiceError(this.logger, error, '질문 목록 조회에 실패했습니다.');
    }
  }

  async findQuestion(id: number) {
    try {
      // 문항에 포함된 선택지들과 함께 반환
      return await this.questionRepository.findByIdWithOptions(id);
    } catch (error) {
      handleServiceError(this.logger, error, '질문 조회에 실패했습니다.');
    }
  }

  async updateQuestion(updateQuestionInput: UpdateQuestionInput) {
    try {
      const question = await checkEntity(
        this.questionRepository,
        updateQuestionInput.id,
        '문항',
      );
      return await this.questionRepository.updateQuestion(
        question,
        updateQuestionInput,
      );
    } catch (error) {
      handleServiceError(this.logger, error, '질문 수정에 실패했습니다.');
    }
  }

  async deleteQuestion(id: number) {
    try {
      await checkEntity(this.questionRepository, id, '문항');
      return await this.questionRepository.deleteQuestion(id);
    } catch (error) {
      handleServiceError(this.logger, error, '질문 삭제에 실패했습니다.');
    }
  }
}
