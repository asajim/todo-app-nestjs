import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TodoItemDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  deadline: string | undefined;

  @ApiProperty()
  @IsBoolean()
  isDone: boolean;

  @ApiProperty()
  @IsDateString()
  created: string;

  @ApiProperty()
  @IsDateString()
  modified: string;
}
