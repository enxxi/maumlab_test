import { DataSource, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Survey } from '../survey/entities/survey.entity';
import { UpdateQuestionInput } from './dto/update-question.input';

@Injectable()
export class QuestionRepository extends Repository<Question> {
  constructor(private dataSource: DataSource) {
    super(Question, dataSource.createEntityManager());
  }

  async createQuestion(content: string, survey: Survey) {
    const question = this.create({ content, survey });
    await this.save(question);
    return question;
  }

  async findAllQuestions(): Promise<Question[]> {
    return await this.find();
  }

  async findById(id: number): Promise<Question> {
    return await this.findOne({ where: { id } });
  }

  async findByIdWithOptions(id: number): Promise<Question> {
    const question = await this.findOne({
      where: { id },
      relations: ['options'],
    });
    return question;
  }

  async updateQuestion(
    question: Question,
    updateQuestionInput: UpdateQuestionInput,
  ) {
    const { id, ...rest } = updateQuestionInput;
    Object.assign(question, rest);
    return await this.save(question);
  }

  async deleteQuestion(id: number) {
    return await this.delete(id);
  }

  async findBySurveyId(surveyId: number) {
    return this.createQueryBuilder('question')
      .innerJoinAndSelect('question.survey', 'survey')
      .where('survey.id = :surveyId', { surveyId })
      .getMany();
  }
}
