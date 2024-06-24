import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { BadRequestException } from '@nestjs/common';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let repository: Repository<Question>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getRepositoryToken(Question),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    repository = module.get<Repository<Question>>(getRepositoryToken(Question));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a question', async () => {
    const question = new Question();
    question.id = 1;
    question.question = 'What is your favorite color?';

    jest.spyOn(repository, 'save').mockResolvedValue(question);

    expect(await service.create(question)).toEqual(question);
  });

  it('should not allow duplicate questions', async () => {
    const createQuestionDto: CreateQuestionDto = {
      question: 'Repeated Question',
    };

    jest.spyOn(repository, 'create').mockReturnValue(createQuestionDto as any);
    jest.spyOn(repository, 'save').mockResolvedValue(createQuestionDto as any);
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(createQuestionDto as any);

    await service.create(createQuestionDto);

    await expect(service.create(createQuestionDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should require the question field', async () => {
    const createQuestionDto: CreateQuestionDto = { question: '' };

    await expect(service.create(createQuestionDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return an array of questions', async () => {
    const question = new Question();
    question.id = 1;
    question.question = 'What is your favorite color?';

    jest.spyOn(repository, 'find').mockResolvedValue([question]);

    expect(await service.findAll()).toEqual([question]);
  });

  it('should return a single question', async () => {
    const question = new Question();
    question.id = 1;
    question.question = 'What is your favorite color?';

    jest.spyOn(repository, 'findOne').mockResolvedValue(question);

    expect(await service.findOne(1)).toEqual(question);
  });

  it('should update a question', async () => {
    const question = new Question();
    question.id = 1;
    question.question = 'What is your favorite color?';

    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(question);

    expect(await service.update(1, question)).toEqual(question);
  });

  it('should remove a question', async () => {
    const deleteSpy = jest
      .spyOn(repository, 'delete')
      .mockResolvedValue(undefined);

    await service.remove(1);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
