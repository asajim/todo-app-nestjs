import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoItemDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  deadline: string | null;

  @ApiProperty()
  @IsBoolean()
  isDone: boolean;
}
