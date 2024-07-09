import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../questions/entities/question.entity';
import { Answer } from 'src/answers/entities/answer.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async seed() {
    const questionsData = [
      { question: 'Do you like to dance?' },
      { question: 'Do you like to play sports?' },
      { question: 'Do you like to talk in public?' },
    ];

    const questions = await Promise.all(
      questionsData.map(async (questionData) => {
        return await this.questionRepository.save(questionData);
      }),
    );

    const answersData = [
      { questionId: 1, answer: 'I love it', score: 5 },
      { questionId: 1, answer: 'I like it', score: 4 },
      { questionId: 1, answer: 'Sometimes', score: 3 },
      { questionId: 1, answer: 'Not that much', score: 2 },
      { questionId: 1, answer: 'No', score: 1 },
      { questionId: 2, answer: 'I love it', score: 5 },
      { questionId: 2, answer: 'I like it', score: 4 },
      { questionId: 2, answer: 'Sometimes', score: 3 },
      { questionId: 2, answer: 'Not that much', score: 2 },
      { questionId: 2, answer: 'No', score: 1 },
      { questionId: 3, answer: 'I love it', score: 5 },
      { questionId: 3, answer: 'I like it', score: 4 },
      { questionId: 3, answer: 'Sometimes', score: 3 },
      { questionId: 3, answer: 'Not that much', score: 2 },
      { questionId: 3, answer: 'No', score: 1 },
    ];

    for (const answerData of answersData) {
      const question = questions.find(
        (question) => question.id === answerData.questionId,
      );
      if (question) {
        const answer = new Answer();
        answer.answer = answerData.answer;
        answer.score = answerData.score;
        answer.question = question;
        await this.answerRepository.save(answer);
      }
    }
  }
}
