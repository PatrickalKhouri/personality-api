import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../questions/entities/question.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { Result } from 'src/results/entities/result.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async seed() {
    const questionsData = [
      { question: 'Do you like to dance?' },
      { question: 'Do you like to play sports?' },
      { question: 'Do you like to talk in public?' },
      { question: 'Are you confortable to talk to strangers?' },
      { question: 'Does new situations make you anxious?' },
      { question: 'What is your feeling towards small talk?' },
      { question: 'Do you like being the center of attentions?' },
    ];

    const questions = await Promise.all(
      questionsData.map(async (questionData) => {
        return await this.questionRepository.save(questionData);
      }),
    );

    const answersData = [
      { questionId: 1, answer: 'I LOVE it', score: 5 },
      { questionId: 1, answer: 'I like it', score: 4 },
      { questionId: 1, answer: 'Sometimes', score: 3 },
      { questionId: 1, answer: 'Not that much', score: 2 },
      { questionId: 1, answer: 'No', score: 1 },
      { questionId: 2, answer: 'I Love it', score: 5 },
      { questionId: 2, answer: 'I like it', score: 4 },
      { questionId: 2, answer: 'Sometimes', score: 3 },
      { questionId: 2, answer: 'Not that much', score: 2 },
      { questionId: 2, answer: 'No', score: 1 },
      { questionId: 3, answer: 'I lOVe it', score: 5 },
      { questionId: 3, answer: 'I like it', score: 4 },
      { questionId: 3, answer: 'Sometimes', score: 3 },
      { questionId: 3, answer: 'Not that much', score: 2 },
      { questionId: 3, answer: 'No', score: 1 },
      { questionId: 4, answer: 'I lovE it', score: 5 },
      { questionId: 4, answer: 'I like it', score: 4 },
      { questionId: 4, answer: 'Sometimes', score: 3 },
      { questionId: 4, answer: 'Not that much', score: 2 },
      { questionId: 4, answer: 'No', score: 1 },
      { questionId: 5, answer: 'I love it', score: 5 },
      { questionId: 5, answer: 'I like it', score: 4 },
      { questionId: 5, answer: 'Sometimes', score: 3 },
      { questionId: 5, answer: 'Not that much', score: 2 },
      { questionId: 5, answer: 'No', score: 1 },
      { questionId: 6, answer: 'I LovE it', score: 5 },
      { questionId: 6, answer: 'I like it', score: 4 },
      { questionId: 6, answer: 'Sometimes', score: 3 },
      { questionId: 6, answer: 'Not that much', score: 2 },
      { questionId: 6, answer: 'No', score: 1 },
      { questionId: 7, answer: 'I lovE it', score: 5 },
      { questionId: 7, answer: 'I like it', score: 4 },
      { questionId: 7, answer: 'Sometimes', score: 3 },
      { questionId: 7, answer: 'Not that much', score: 2 },
      { questionId: 7, answer: 'No', score: 1 },
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

    const resultsData = [
      {
        maxScore: 7,
        title: 'Very Introvert',
        description:
          'Based on your answers, it seems you have a strong tendency towards introversion. You likely find solace in solitude, drawing energy from quiet reflection and personal time. Social interactions may feel draining, and you prefer deep, meaningful conversations over small talk.\n\nWhile you may be reserved, your introspective nature allows you to understand yourself deeply, making you thoughtful and observant. You value quality over quantity in your relationships, often seeking out a few close connections rather than a wide social circle.',
      },
      {
        maxScore: 15,
        title: 'Can be both',
        description:
          'Your answers suggest that you are flexible in your social interactions, able to enjoy both solitude and social engagement. You may find yourself comfortable in a variety of settings, sometimes seeking out company and other times preferring time alone. This balance allows you to adapt to different situations with ease.\n\nWhile you can enjoy the energy of being around others, you also appreciate the value of personal time. This adaptability means you can thrive in diverse environments, maintaining a well-rounded approach to your social life.',
      },
      {
        maxScore: 25,
        title: 'Extrovert',
        description:
          'Your responses indicate a strong inclination towards extroversion. You are energized by social interactions and enjoy being around others, often seeking out opportunities to connect with people. Small talk and lively conversations are areas where you thrive, and you likely find solitude less appealing.\n\nBeing highly sociable, you are often the life of the party, with a knack for making connections and bringing people together. Your outgoing nature makes you approachable, and you may find yourself at the center of many social circles, valuing the dynamic and energetic atmosphere of group activities.',
      },
    ];

    await Promise.all(
      resultsData.map(async (resultData) => {
        return await this.resultRepository.save(resultData);
      }),
    );
  }
}
