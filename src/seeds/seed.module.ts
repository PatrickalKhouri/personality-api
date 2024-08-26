import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { Result } from '../results/entities/result.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, Result])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
