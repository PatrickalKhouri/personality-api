import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Answer } from '../../answers/entities/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
