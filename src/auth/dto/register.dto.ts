import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  password: string;
  fullName: string;
}
