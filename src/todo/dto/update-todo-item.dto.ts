import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateTodoItemDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsDateString()
  @IsOptional()
  deadline: string | undefined;

  @IsBoolean()
  @IsOptional()
  isDone: boolean;
}
