import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/schemas/user.schema';

@ObjectType()
export class RegisterResponseDto {
  @Field()
  refreshToken: string;
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}
