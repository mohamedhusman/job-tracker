import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LogDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
