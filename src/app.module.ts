import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Answer } from './answers/entities/answer.entity';
import { Question } from './questions/entities/question.entity';
import { Result } from './results/entities/result.entity';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { SeedModule } from './seeds/seed.module';
import { ConfigModule } from '@nestjs/config';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Question, Answer, Result],
      synchronize: true,
    }),
    QuestionsModule,
    AnswersModule,
    ResultsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
