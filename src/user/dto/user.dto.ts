import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { UserDocument } from 'src/user/schemas/user.schema';

export type RoleUser = 'ADMIN' | 'INSTRUCTOR' | 'USER';
export enum UserRole { 'ADMIN', 'INSTRUCTOR', 'USER'};//swagger
export type UserTypeData = keyof UserDocument;

@InputType()
export class EmailAndPasswordDto {

  @ApiProperty({ example: "example@mail.com", description: "unique email " })
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: "123456", description: "strong password" })
  @Field()
  @IsNotEmpty()
  password: string;
}

@InputType()
export class UpdateUserDto {
  @ApiProperty({ example: "James", description: "first name" })
  @Field({nullable:true})
  @IsString()
  firstName: string;
  @ApiProperty({ example: "Admas", description: "last name" })
  @Field({nullable:true})
  @IsString()
  lastName: string;
  @ApiProperty({ example: "1994-08-10", description: "birthday" })
  @Field({nullable:true})
  @IsString()
  birthday: string;
  @ApiProperty({ example: "sofware engineer", description: "job" })
  @Field({nullable:true})
  @IsString()
  job: string;
  @ApiProperty({ example: "hard working", description: "bio" })
  @Field({nullable:true})
  @IsString()
  bio: string;
  @ApiProperty({ example: "123143adsda.png", description: "image" })
  @Field({nullable:true})
  @IsString()
  avatar: string;
}