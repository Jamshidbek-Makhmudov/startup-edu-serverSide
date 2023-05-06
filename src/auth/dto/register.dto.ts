import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

//dto-data transfer object; interfacega oxhsidi keladigan malumotlarni typeni kiritib qoyamiz dto body deb tushunsak ham boladi
export class RegisterAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  // @IsNotEmpty()
  // @IsString()
  fullName: string;
}
