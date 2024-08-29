import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const result = this.resultRepository.create(createResultDto);
    return this.resultRepository.save(result);
  }

  findAll() {
    return this.resultRepository.find();
  }

  async findByScore(score: number): Promise<Result> {
    return this.resultRepository
      .createQueryBuilder('result')
      .where('result.maxScore >= :score', { score })
      .orderBy('result.maxScore', 'ASC')
      .getOne();
  }

  findOne(id: number) {
    return this.resultRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    await this.resultRepository.update(id, updateResultDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.resultRepository.delete(id);
  }
}
