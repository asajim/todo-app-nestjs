import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoItemDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  deadline: string | undefined;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDone: boolean;
}
