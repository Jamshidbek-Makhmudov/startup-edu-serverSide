import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class TokenDto {
  @ApiProperty({ example: 'example@mail.com', description: `user's email` })
  @Field()
  @IsString({ message: 'You did not pass refresh token or it is not a string' })
  refreshToken: string;
}
