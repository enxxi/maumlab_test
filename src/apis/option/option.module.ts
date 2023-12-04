import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Question } from '../question/entities/question.entity';
import { OptionRepository } from './option.repository';
import { QuestionRepository } from '../question/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Option, Question])],
  providers: [
    OptionResolver,
    OptionService,
    OptionRepository,
    QuestionRepository,
  ],
})
export class OptionModule {}
