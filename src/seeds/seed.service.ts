import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async seed() {
    const questions = [
      { question: 'Do you like to dance?' },
      { question: 'Do you like to play sports?' },
      { question: 'Do you like to talk in public?' },
    ];

    for (const question of questions) {
      await this.questionRepository.save(question);
    }
  }
}
