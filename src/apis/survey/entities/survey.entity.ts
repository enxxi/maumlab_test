import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Question } from 'src/apis/question/entities/question.entity';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field({ nullable: false })
  @Column({ nullable: false })
  title: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  description: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => [Question])
  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];
}
