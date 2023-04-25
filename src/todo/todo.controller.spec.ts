import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ConfigService } from '@nestjs/config';

describe('TodoController', () => {
  let controller: TodoController;
  const mockConfigService: Partial<ConfigService> = {
    getOrThrow<T = any>(propertyPath: any): Exclude<T, undefined> {
      return propertyPath;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
