import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { IsNotEmpty,  } from 'class-validator';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Answer field is required' })
  answer: string;

  @Column()
  @IsNotEmpty({ message: 'Score field is required' })
  score: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
