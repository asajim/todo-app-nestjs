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
import { IdParamDto } from './dto/id-param.dto';

@UseGuards(BasicAuthGuard)
@ApiTags('Todo')
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'Get all todo items' })
  @Get()
  async getTodoItems(): Promise<TodoItemDto[]> {
    return await this.todoService.getTodoItems();
  }

  @ApiOperation({ summary: 'Get todo item by id' })
  @Get(':id')
  async getTodoItemById(@Param() { id }: IdParamDto): Promise<TodoItemDto> {
    return await this.todoService.getTodoItem(parseInt(id));
  }

  @ApiOperation({ summary: 'Create new todo item' })
  @Post()
  async addTodoItem(@Body() request: CreateTodoItemDto): Promise<TodoItemDto> {
    return await this.todoService.addTodoItem(request);
  }

  @ApiOperation({ summary: 'Update todo item' })
  @Put(':id')
  async updateTodoItem(
    @Param() { id }: IdParamDto,
    @Body() request: UpdateTodoItemDto,
  ): Promise<TodoItemDto> {
    return await this.todoService.updateTodoItem(parseInt(id), request);
  }

  @ApiOperation({ summary: 'Delete todo item' })
  @Delete(':id')
  async deleteTodoItem(@Param() { id }: IdParamDto) {
    await this.todoService.deleteTodoItem(parseInt(id));
  }
}
