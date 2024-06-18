import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  score: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
