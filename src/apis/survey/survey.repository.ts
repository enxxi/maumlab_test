import { DataSource, Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';

@Injectable()
export class SurveyRepository extends Repository<Survey> {
  constructor(private dataSource: DataSource) {
    super(Survey, dataSource.createEntityManager());
  }

  async createSurvey(createSurveyInput: CreateSurveyInput) {
    const survey = await this.create(createSurveyInput);
    await this.save(survey);
    return survey;
  }

  async findById(id: number): Promise<Survey> {
    return await this.findOne({ where: { id } });
  }

  async updateSurvey(survey, updateSurveyInput: UpdateSurveyInput) {
    const { id, ...rest } = updateSurveyInput;
    Object.assign(survey, rest);
    return await this.save(survey);
  }

  async findAllSurveys(): Promise<Survey[]> {
    return await this.find();
  }

  async findCompletedSurveys(): Promise<Survey[]> {
    return await this.find({ where: { isCompleted: true } });
  }

  async findByIdWithQuestions(id: number): Promise<Survey> {
    const survey = await this.findOne({
      where: { id },
      relations: ['questions'],
    });
    return survey;
  }

  async deleteSurvey(id: number) {
    return await this.delete(id);
  }
}
