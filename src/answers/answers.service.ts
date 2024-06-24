import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = this.answerRepository.create(createAnswerDto);
    return this.answerRepository.save(answer);
  }

  findAll(): Promise<Answer[]> {
    return this.answerRepository.find({ relations: ['question'] });
  }

  findOne(id: number): Promise<Answer> {
    return this.answerRepository.findOne({
      where: { id },
      relations: ['question'],
    });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    await this.answerRepository.update(id, updateAnswerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.answerRepository.delete(id);
  }
}
