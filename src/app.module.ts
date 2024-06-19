import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Question, Answer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Question, Answer]),
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
