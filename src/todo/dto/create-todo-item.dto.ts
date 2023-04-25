import { IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsString()
  title: string;
}
