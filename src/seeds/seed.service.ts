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
      { question: 'How do you prefer to spend your weekend?' },
      { question: 'How do you feel about attending large social gatherings?' },
      { question: 'How do you typically recharge after a long day?' },
      { question: 'What is your approach to meeting new people?' },
      { question: 'How do you handle group projects?' },
      { question: 'How do you feel about traveling alone?' },
      { question: 'What’s your favorite way to relax?' },
      { question: 'How do you feel in a crowded place?' },
      { question: 'How do you prefer to communicate with friends?' },
      { question: 'How do you make decisions in a group setting?' },
    ];

    const questions = [];
    for (const questionData of questionsData) {
      const question = await this.questionRepository.save(questionData);
      questions.push(question);
    }

    const answersData = [
      {
        questionId: 1,
        answers: [
          { answer: 'Alone at home with a good book', score: 1 },
          { answer: 'A quiet walk in the park', score: 2 },
          { answer: 'A small gathering with close friends', score: 3 },
          { answer: 'A lively party with new people', score: 4 },
          { answer: 'Exploring a new city with a big group', score: 5 },
        ],
      },
      {
        questionId: 2,
        answers: [
          { answer: 'I avoid them if possible', score: 1 },
          { answer: 'I feel anxious but sometimes go', score: 2 },
          { answer: 'I can manage but prefer smaller groups', score: 3 },
          { answer: 'I enjoy them', score: 4 },
          { answer: 'I thrive in such environments', score: 5 },
        ],
      },
      {
        questionId: 3,
        answers: [
          { answer: 'In solitude, reflecting on the day', score: 1 },
          { answer: 'With a calm activity like reading', score: 2 },
          { answer: 'Talking with a close friend', score: 3 },
          { answer: 'Engaging in a fun social activity', score: 4 },
          { answer: 'Being surrounded by people', score: 5 },
        ],
      },
      {
        questionId: 4,
        answers: [
          { answer: 'I find it challenging and draining', score: 1 },
          { answer: 'I’m cautious and take my time', score: 2 },
          { answer: 'I can adapt, depending on the situation', score: 3 },
          { answer: 'I’m open and comfortable', score: 4 },
          { answer: 'I eagerly seek out new connections', score: 5 },
        ],
      },
      {
        questionId: 5,
        answers: [
          { answer: 'I prefer to work alone', score: 1 },
          { answer: 'I take on individual tasks within the group', score: 2 },
          { answer: 'I can collaborate when necessary', score: 3 },
          { answer: 'I actively contribute and lead', score: 4 },
          { answer: 'I love working with and leading teams', score: 5 },
        ],
      },
      {
        questionId: 6,
        answers: [
          { answer: 'I enjoy the solitude and independence', score: 1 },
          { answer: 'It makes me nervous but can be fun', score: 2 },
          { answer: 'I’m okay with it, but prefer company', score: 3 },
          { answer: 'I enjoy it with friends or family', score: 4 },
          { answer: 'I thrive on group travel experiences', score: 5 },
        ],
      },
      {
        questionId: 7,
        answers: [
          { answer: 'Reading a book or watching a movie alone', score: 1 },
          { answer: 'A quiet activity like gardening or drawing', score: 2 },
          { answer: 'Chatting with a friend', score: 3 },
          { answer: 'Playing a team sport or game', score: 4 },
          { answer: 'Going out and socializing', score: 5 },
        ],
      },
      {
        questionId: 8,
        answers: [
          { answer: 'I feel overwhelmed and avoid it', score: 1 },
          { answer: 'I manage by staying close to the edges', score: 2 },
          { answer: 'I feel okay but not thrilled', score: 3 },
          { answer: 'I enjoy the buzz and energy', score: 4 },
          { answer: 'I thrive and feel energized', score: 5 },
        ],
      },
      {
        questionId: 9,
        answers: [
          { answer: 'Through deep one-on-one conversations', score: 1 },
          { answer: 'Occasional messages or calls', score: 2 },
          { answer: 'A mix of texting and in-person meetups', score: 3 },
          { answer: 'Frequent social media interactions', score: 4 },
          { answer: 'Constant communication and group chats', score: 5 },
        ],
      },
      {
        questionId: 10,
        answers: [
          { answer: 'I prefer others to take the lead', score: 1 },
          { answer: 'I give my opinion but stay quiet', score: 2 },
          { answer: 'I discuss but prefer consensus', score: 3 },
          { answer: 'I like to offer suggestions and lead', score: 4 },
          { answer: 'I confidently lead and decide', score: 5 },
        ],
      },
    ];

    for (const answerData of answersData) {
      const question = questions.find(
        (question) => question.id === answerData.questionId,
      );
      if (question) {
        const shuffledAnswers = answerData.answers.sort(
          () => Math.random() - 0.5,
        );
        for (const answer of shuffledAnswers) {
          const newAnswer = new Answer();
          newAnswer.answer = answer.answer;
          newAnswer.score = answer.score;
          newAnswer.question = question;
          await this.answerRepository.save(newAnswer);
        }
      }
    }

    const resultsData = [
      {
        maxScore: 10,
        title: 'Strongly Introverted',
        description:
          'You are highly introverted, finding energy in solitude and introspection. Social situations might be overwhelming, and you prefer deep connections with a few rather than casual encounters.\n\nWhile you may find large social gatherings exhausting, your introspective nature allows for deep personal insights. You cherish quality over quantity in relationships, often opting for meaningful interactions.',
      },
      {
        maxScore: 15,
        title: 'Balanced Introvert',
        description:
          'You lean towards introversion but can engage socially when needed. You value your alone time but can enjoy the company of others in moderation.\n\nYour ability to navigate both solitude and social situations makes you adaptable. You appreciate deep, meaningful interactions and take time to recharge after social activities.',
      },
      {
        maxScore: 20,
        title: 'Balanced Extrovert',
        description:
          'You enjoy social interactions but also appreciate time alone. You can comfortably switch between being outgoing and introspective.\n\nThis balance allows you to thrive in various situations. You can easily engage with others and still find comfort in spending time on your own.',
      },
      {
        maxScore: 25,
        title: 'Strongly Extroverted',
        description:
          'You are highly extroverted, drawing energy from being around others. Social interactions are your forte, and you thrive in lively environments.\n\nYou are often the life of the party, enjoying the buzz of social activities. Your outgoing nature makes you a natural leader in group settings.',
      },
    ];

    await Promise.all(
      resultsData.map(async (resultData) => {
        return await this.resultRepository.save(resultData);
      }),
    );
  }
}
