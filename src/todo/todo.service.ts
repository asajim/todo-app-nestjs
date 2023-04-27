import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TodoItemDto } from './dto/todo-item.dto';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { Repository } from 'typeorm';
import { TodoItemEntity } from './entity/todo-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validateSync } from 'class-validator';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoItemEntity)
    private todoItemRepository: Repository<TodoItemEntity>,
  ) {}

  async getTodoItems(): Promise<TodoItemDto[]> {
    const items = await this.todoItemRepository.find();
    return items.map(this.convertEntityToDto);
  }

  async getTodoItem(id: number): Promise<TodoItemDto> {
    const item = await this.todoItemRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!item) {
      throw new NotFoundException();
    }
    return this.convertEntityToDto(item);
  }

  async addTodoItem(request: CreateTodoItemDto): Promise<TodoItemDto> {
    const newItem = await this.todoItemRepository.save(request);
    return this.convertEntityToDto(newItem);
  }

  async updateTodoItem(id: number, request: UpdateTodoItemDto) {
    const item = await this.todoItemRepository.findOne({
      where: { id: id },
    });
    if (!item) {
      throw new NotFoundException();
    }
    const result = await this.todoItemRepository.save({
      id: item.id,
      created: item.created,
      modified: item.modified,
      ...request,
    });
    return this.convertEntityToDto(result);
  }

  async deleteTodoItem(id: number) {
    await this.todoItemRepository.delete({
      id: id,
    });
  }

  convertEntityToDto(entity: TodoItemEntity): TodoItemDto {
    const dto: TodoItemDto = { ...entity };
    const errors = validateSync(dto);
    if (errors.length) {
      throw new InternalServerErrorException(
        `Invalid fields at ${TodoItemDto.name}: ${errors
          .map((value) => Object.values(value.constraints))
          .join(', ')}`,
      );
    }
    return dto;
  }
}
