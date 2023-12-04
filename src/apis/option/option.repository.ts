import { DataSource, Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Question } from '../question/entities/question.entity';
import { UpdateOptionInput } from './dto/update-option.input';

@Injectable()
export class OptionRepository extends Repository<Option> {
  constructor(private dataSource: DataSource) {
    super(Option, dataSource.createEntityManager());
  }

  async createOption(option: object, question: Question) {
    const newOption = await this.create({ ...option, question });
    return await this.save(newOption);
  }

  async findAllOptions(): Promise<Option[]> {
    return await this.find();
  }

  async findById(id: number): Promise<Option> {
    return await this.findOne({ where: { id } });
  }

  async findByIdWithResponses(id: number): Promise<Option> {
    const option = await this.findOne({
      where: { id },
      relations: ['responses'],
    });
    return option;
  }

  async updateOption(option: Option, updateOptionInput: UpdateOptionInput) {
    const { id, ...rest } = updateOptionInput;
    Object.assign(option, rest);
    return await this.save(option);
  }

  async deleteOption(id: number) {
    return await this.delete(id);
  }
}
