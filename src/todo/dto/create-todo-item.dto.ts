import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoItemDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDateString({ strict: true })
  @IsOptional()
  deadline: string | undefined;
}
