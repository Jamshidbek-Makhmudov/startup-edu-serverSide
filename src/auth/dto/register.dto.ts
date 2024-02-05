import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterAuthDto {
  @ApiProperty({ example: 'example@mail.com', description: `user's email` })
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'pa$$W0Rd123!', description: `user's password` })
  @Field()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @ApiProperty({ example: 'James Adams', description: `user's user's full name` })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  fullName?: string;
}
