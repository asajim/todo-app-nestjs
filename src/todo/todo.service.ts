import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoItemDto } from './dto/todo-item.dto';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';

@Injectable()
export class TodoService {
  private items: TodoItemDto[] = [];

  getTodoItems(): TodoItemDto[] {
    return this.items;
  }

  getTodoItem(id: string): TodoItemDto {
    const item = this.items.find((value) => value.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  addTodoItem(request: CreateTodoItemDto) {
    const newItem = {
      id: (this.items.length + 1).toString(),
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      deadline: undefined,
      title: request.title,
      isDone: false,
    };
    this.items.push(newItem);
    return newItem;
  }

  updateTodoItem(id: string, request: UpdateTodoItemDto) {
    const index = this.items.findIndex((value) => value.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    const newItem = { ...this.items[index], ...request };
    this.items[index] = newItem;
    return newItem;
  }

  deleteTodoItem(id: string) {
    const index = this.items.findIndex((value) => value.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.items.splice(index, 1);
  }
}
