import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TodoItemDto } from './dto/todo-item.dto';
import { TodoService } from './todo.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { BasicAuthGuard } from '../auth/basic-auth-guard.service';

@UseGuards(BasicAuthGuard)
@ApiTags('Todo')
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'Get all todo items' })
  @Get()
  getTodoItems(): TodoItemDto[] {
    return this.todoService.getTodoItems();
  }

  @ApiOperation({ summary: 'Get todo item by id' })
  @Get(':id')
  getTodoItemById(@Param() { id }: { id: string }): TodoItemDto {
    return this.todoService.getTodoItem(id);
  }

  @ApiOperation({ summary: 'Create new todo item' })
  @Post()
  addTodoItem(@Body() request: CreateTodoItemDto): TodoItemDto {
    return this.todoService.addTodoItem(request);
  }

  @ApiOperation({ summary: 'Update todo item' })
  @Put(':id')
  updateTodoItem(
    @Param() { id }: { id: string },
    @Body() request: UpdateTodoItemDto,
  ): TodoItemDto {
    return this.todoService.updateTodoItem(id, request);
  }

  @ApiOperation({ summary: 'Delete todo item' })
  @Delete(':id')
  deleteTodoItem(@Param() { id }: { id: string }) {
    this.todoService.deleteTodoItem(id);
  }
}
