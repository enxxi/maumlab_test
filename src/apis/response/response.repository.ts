import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Response } from './entities/response.entity';
import { Option } from '../option/entities/option.entity';

@Injectable()
export class ResponseRepository extends Repository<Response> {
  constructor(private dataSource: DataSource) {
    super(Response, dataSource.createEntityManager());
  }

  async createResponse(option: Option) {
    const response = this.create({ option });
    await this.save(response);
    return response;
  }

  async findAllResponses(): Promise<Response[]> {
    return await this.find();
  }

  async findById(id: number): Promise<Response> {
    return await this.findOne({ where: { id } });
  }

  async findByIdWithOptions(id: number): Promise<Response> {
    const response = await this.findOne({
      where: { id },
      relations: ['options'],
    });
    return response;
  }

  async updateResponse(response: Response, option: Option) {
    response.option = option;
    return await this.save(response);
  }

  async deleteResponse(id: number) {
    return await this.delete(id);
  }
}
