import { Question } from 'src/apis/question/entities/question.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Response } from 'src/apis/response/entities/response.entity';

@ObjectType()
@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ nullable: false })
  @Field({ nullable: false })
  content: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  score: number;

  @ManyToOne(() => Question, (question) => question.options)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Field(() => [Response])
  @OneToMany(() => Response, (response) => response.option)
  responses: Response[];
}
