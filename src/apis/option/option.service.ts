import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { OptionRepository } from './option.repository';
import { QuestionRepository } from '../question/question.repository';
import { checkEntity, handleServiceError } from 'src/utils/commonFunction';

@Injectable()
export class OptionService {
  private readonly logger = new Logger(OptionService.name);

  constructor(
    private optionRepository: OptionRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async createOption(createOptionInput: CreateOptionInput) {
    try {
      const { questionId, ...rest } = createOptionInput;
      const question = await checkEntity(
        this.questionRepository,
        questionId,
        '문항',
      );
      return await this.optionRepository.createOption(rest, question);
    } catch (error) {
      handleServiceError(this.logger, error, '선택지 생성에 실패했습니다.');
    }
  }

  async findAllOptions() {
    try {
      return await this.optionRepository.findAllOptions();
    } catch (error) {
      handleServiceError(
        this.logger,
        error,
        '선택지 목록 조회에 실패했습니다.',
      );
    }
  }

  async findOption(id: number) {
    try {
      await checkEntity(this.optionRepository, id, '선택지');
      return await this.optionRepository.findByIdWithResponses(id);
    } catch (error) {
      handleServiceError(this.logger, error, '선택지 조회에 실패했습니다.');
    }
  }

  async updateOption(updateOptionInput: UpdateOptionInput) {
    try {
      const option = await checkEntity(
        this.optionRepository,
        updateOptionInput.id,
        '선택지',
      );

      return await this.optionRepository.updateOption(
        option,
        updateOptionInput,
      );
    } catch (error) {
      handleServiceError(this.logger, error, '선택지 수정에 실패했습니다.');
    }
  }

  async deleteOption(id: number) {
    try {
      await checkEntity(this.optionRepository, id, '선택지');
      return await this.optionRepository.deleteOption(id);
    } catch (error) {
      handleServiceError(this.logger, error, '선택지 삭제에 실패했습니다.');
    }
  }

  private async checkQuestion(id) {
    const question = await this.questionRepository.findById(id);
    if (!question) {
      throw new NotFoundException('해당 id의 질문을 찾을 수 없습니다.');
    }
    return question;
  }

  private async checkOption(id) {
    const option = await this.optionRepository.findById(id);
    if (!option) {
      throw new NotFoundException('해당 id의 선택지를 찾을 수 없습니다.');
    }
    return option;
  }
}
