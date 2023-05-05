import { IsString } from 'class-validator';

export class TokenDto {
  @IsString({ message: "You didn't pass the refresh token or it's not a string" })
  refreshToken: string;
}
