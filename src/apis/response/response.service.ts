import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { checkEntity, handleServiceError } from 'src/utils/commonFunction';
import { ResponseRepository } from './response.repository';
import { OptionRepository } from '../option/option.repository';

@Injectable()
export class ResponseService {
  private readonly logger = new Logger(ResponseService.name);

  constructor(
    private responseRepository: ResponseRepository,
    private optionRepository: OptionRepository,
  ) {}

  async createResponse(optionId: number) {
    try {
      const option = await checkEntity(
        this.optionRepository,
        optionId,
        '선택지',
      );

      return await this.responseRepository.createResponse(option);
    } catch (error) {
      handleServiceError(this.logger, error, '답변 생성에 실패했습니다.');
    }
  }

  async findAllResponses() {
    try {
      return await this.responseRepository.findAllResponses();
    } catch (error) {
      handleServiceError(this.logger, error, '답변 목록 조회에 실패했습니다.');
    }
  }

  async findResponse(id: number) {
    try {
      return await checkEntity(this.responseRepository, id, '답변');
    } catch (error) {
      handleServiceError(this.logger, error, '개별 답변 조회에 실패했습니다.');
    }
  }

  async updateResponse(id: number, optionId: number) {
    try {
      const response = await checkEntity(this.responseRepository, id, '답변');
      const option = await checkEntity(
        this.optionRepository,
        optionId,
        '선택지',
      );
      return await this.responseRepository.updateResponse(response, option);
    } catch (error) {
      handleServiceError(this.logger, error, '답변 수정에 실패했습니다.');
    }
  }

  async deleteResponse(id: number) {
    try {
      await checkEntity(this.responseRepository, id, '답변');
      return await this.responseRepository.deleteResponse(id);
    } catch (error) {
      handleServiceError(this.logger, error, '답변 삭제에 실패했습니다.');
    }
  }
}
