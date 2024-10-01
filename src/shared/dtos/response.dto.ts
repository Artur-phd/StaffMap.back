import { IsNotEmpty } from 'class-validator';

export class ResponseDto<T = null> {
  @IsNotEmpty()
  data: T;
}
