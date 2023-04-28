import { IsNumberString } from 'class-validator';

export class IdParamDto {
  @IsNumberString()
  id: string;
}
