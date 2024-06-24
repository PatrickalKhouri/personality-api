import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Answer } from '../../answers/entities/answer.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
@Unique(['question'])
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Question field is required' })
  @IsString({ message: 'Question field must be a string' })
  question: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}