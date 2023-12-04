import { Option } from 'src/apis/option/entities/option.entity';
import { Survey } from 'src/apis/survey/entities/survey.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field({ nullable: false })
  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @Field(() => [Option])
  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}
