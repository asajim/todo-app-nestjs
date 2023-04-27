import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoItemDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  deadline: string | undefined;
}
