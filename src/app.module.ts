import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Question, Answer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Question, Answer]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
