import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class TodoItemDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsDateString()
  @IsOptional()
  deadline: string | undefined;

  @IsBoolean()
  isDone: boolean;

  @IsDateString()
  created: string;

  @IsDateString()
  modified: string;
}
