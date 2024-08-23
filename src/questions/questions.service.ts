import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Answer } from '../answers/entities/answer.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const existingQuestion = await this.questionRepository.findOne({
      where: { question: createQuestionDto.question },
    });
    if (existingQuestion) {
      throw new BadRequestException('Question already exists');
    }

    if (
      !createQuestionDto.question ||
      createQuestionDto.question.trim() === ''
    ) {
      throw new BadRequestException('Question field is required');
    }

    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  findAll() {
    return this.questionRepository.find({ relations: ['answers'] });
  }

  findOne(id: number) {
    return this.questionRepository.findOne({
      where: { id },
      relations: ['answers'],
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.questionRepository.update(id, updateQuestionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.questionRepository.delete(id);
  }

  async addAnswerToQuestion(
    questionId: number,
    answerText: string,
    score: number,
  ): Promise<Answer> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
      relations: ['answers'],
    });

    if (!question) {
      throw new BadRequestException('Question not found');
    }

    if (question.answers.length >= 5) {
      throw new BadRequestException(
        'A question cannot have more than 5 answers',
      );
    }

    const answer = this.answerRepository.create({
      answer: answerText,
      score: score,
      question,
    });
    return this.answerRepository.save(answer);
  }

  async findRandom(limit: number = 5): Promise<Question[]> {
    const allQuestions = await this.questionRepository.find({
      relations: ['answers'],
    });
    return allQuestions.sort(() => 0.5 - Math.random()).slice(0, limit);
  }
}
