import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginAuthDto {
  @ApiProperty({ example: 'example@mail.com', description: `user's email` })
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @ApiProperty({ example: 'pa$$W0Rd123!', description: `user's password` })
  // @IsStrongPassword()
  // @MinLength(6)
  // @IsNotEmpty()
  password?: string;

  @ApiProperty({ example: 'James Adams', description: `user's user's full name` })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ example: '12123sasd.png', description: `user's avatar` })
  @Field({ nullable: true })
  @IsOptional()
  avatar?: string;
}
