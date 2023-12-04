import { DataSource, Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';

@Injectable()
export class SurveyRepository extends Repository<Survey> {
  constructor(private readonly dataSource: DataSource) {
    super(Survey, dataSource.createEntityManager());
  }

  async createSurvey(createSurveyInput: CreateSurveyInput) {
    const survey = await this.create(createSurveyInput);
    await await this.save(survey);
    return survey;
  }

  async findById(id: number): Promise<Survey> {
    const survey = await this.findOne({ where: { id } });
    return survey;
  }

  async updateSurvey(survey, updateSurveyInput: UpdateSurveyInput) {
    const { id, ...rest } = updateSurveyInput;
    Object.assign(survey, rest);
    return await this.save(survey);
  }

  async findAllSurveys() {
    return await this.find();
  }

  async deleteSurvey(id) {
    return await this.delete(id);
  }
}
