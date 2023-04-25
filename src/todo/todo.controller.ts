import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { TodoItemDto } from './dto/todo-item.dto';
import { TodoService } from './todo.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';

@Controller('api/v1/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'Get all todos' })
  @Get()
  getTodoItems(): TodoItemDto[] {
    return this.todoService.getTodoItems();
  }

  @ApiOperation({ summary: 'Get all todos' })
  @Get(':id')
  getTodoItemById(@Param() { id }: { id: string }): TodoItemDto {
    return this.todoService.getTodoItem(id);
  }

  @ApiOperation({})
  @Post()
  addTodoItem(@Body() request: CreateTodoItemDto): TodoItemDto {
    return this.todoService.addTodoItem(request);
  }

  @ApiOperation({})
  @Put(':id')
  updateTodoItem(
    @Param() { id }: { id: string },
    @Body() request: UpdateTodoItemDto,
  ): TodoItemDto {
    return this.todoService.updateTodoItem(id, request);
  }

  @ApiOperation({})
  @Delete(':id')
  deleteTodoItem(@Param() { id }: { id: string }) {
    this.todoService.deleteTodoItem(id);
  }
}
