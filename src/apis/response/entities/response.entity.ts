import { Option } from 'src/apis/option/entities/option.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Option, (option) => option.responses)
  @JoinColumn({ name: 'option_id' })
  option: Option;
}
