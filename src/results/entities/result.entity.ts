import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: ' maxScore field is required' })
  maxScore: number;

  @Column()
  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty({ message: 'Title field is required' })
  title: string;

  @Column()
  @MinLength(50)
  @IsNotEmpty({ message: 'Description field is required' })
  description: string;
}
