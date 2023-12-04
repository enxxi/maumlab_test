import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionService } from './option.service';
import { Option } from './entities/option.entity';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';

@Resolver(() => Option)
export class OptionResolver {
  constructor(private readonly optionService: OptionService) {}

  @Mutation(() => Option)
  async createOption(
    @Args('createOptionInput') createOptionInput: CreateOptionInput,
  ) {
    // 선택지 생성
    return await this.optionService.createOption(createOptionInput);
  }

  @Query(() => [Option], { name: 'options' })
  async findAll() {
    // 모든 선택지 조회
    return this.optionService.findAllOptions();
  }

  @Query(() => Option, { name: 'option' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    // 답변을 포함한 개별 선택지 조회
    return this.optionService.findOption(id);
  }

  @Mutation(() => Option)
  async updateOption(
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ) {
    // 선택지 수정
    return this.optionService.updateOption(updateOptionInput);
  }

  @Mutation(() => Option)
  async deleteOption(@Args('id', { type: () => Int }) id: number) {
    // 선택지 삭제
    return this.optionService.deleteOption(id);
  }
}
