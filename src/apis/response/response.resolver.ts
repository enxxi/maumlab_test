import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResponseService } from './response.service';
import { Response } from './entities/response.entity';

@Resolver(() => Response)
export class ResponseResolver {
  constructor(private readonly responseService: ResponseService) {}

  @Mutation(() => Response)
  async createResponse(
    @Args('optionId', { type: () => Int }) optionId: number,
  ) {
    // 답변 생성
    return await this.responseService.createResponse(optionId);
  }

  @Query(() => [Response], { name: 'responses' })
  async findAllResponses() {
    // 모든 답변 조회
    return await this.responseService.findAllResponses();
  }

  @Query(() => Response, { name: 'response' })
  async findResponse(@Args('id', { type: () => Int }) id: number) {
    // 개별 답변 조회
    return await this.responseService.findResponse(id);
  }

  @Mutation(() => Response)
  async updateResponse(
    @Args('id', { type: () => Int }) id: number,
    @Args('optionId', { type: () => Int }) optionId: number,
  ) {
    // 선택한 선택지를 수정
    return await this.responseService.updateResponse(id, optionId);
  }

  @Mutation(() => Response)
  async deleteResponse(@Args('id', { type: () => Int }) id: number) {
    // 답변 삭제
    return await this.responseService.deleteResponse(id);
  }
}
