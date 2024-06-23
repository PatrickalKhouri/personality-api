import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { Question } from '../questions/entities/question.entity';

describe('AnswersService', () => {
  let service: AnswersService;
  let repository: Repository<Answer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(Answer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
    repository = module.get<Repository<Answer>>(getRepositoryToken(Answer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an answer', async () => {
    const answer = new Answer();
    answer.id = 1;
    answer.answer = 'Blue';
    answer.question = new Question();
    answer.question.id = 1;

    jest.spyOn(repository, 'save').mockResolvedValue(answer);

    expect(await service.create(answer)).toEqual(answer);
  });

  it('should return an array of answers', async () => {
    const answer = new Answer();
    answer.id = 1;
    answer.answer = 'Blue';
    answer.question = new Question();
    answer.question.id = 1;

    jest.spyOn(repository, 'find').mockResolvedValue([answer]);

    expect(await service.findAll()).toEqual([answer]);
  });

  it('should return a single answer', async () => {
    const answer = new Answer();
    answer.id = 1;
    answer.answer = 'Blue';
    answer.question = new Question();
    answer.question.id = 1;

    jest.spyOn(repository, 'findOne').mockResolvedValue(answer);

    expect(await service.findOne(1)).toEqual(answer);
  });

  it('should update an answer', async () => {
    const answer = new Answer();
    answer.id = 1;
    answer.answer = 'Blue';
    answer.question = new Question();
    answer.question.id = 1;

    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(answer);

    expect(await service.update(1, answer)).toEqual(answer);
  });

  it('should remove an answer', async () => {
    const deleteSpy = jest
      .spyOn(repository, 'delete')
      .mockResolvedValue(undefined);

    await service.remove(1);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
