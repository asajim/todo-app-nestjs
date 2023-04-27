import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TodoItemDto {
  @ApiProperty()
  @IsNumber()
  id: number;

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
