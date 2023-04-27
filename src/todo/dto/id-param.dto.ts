import { IsNumber } from 'class-validator';

export class IdParamDto {
  @IsNumber()
  id: number;
}
