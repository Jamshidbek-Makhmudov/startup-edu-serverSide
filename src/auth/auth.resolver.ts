import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-core';
import { AuthService } from 'src/auth/auth.service';
import { LoginAuthDto } from 'src/auth/dto/login.dto';
import { RegisterResponseDto } from 'src/auth/dto/response.dto';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  /**register */
  @Mutation(() => RegisterResponseDto, { description: 'register user' })
  async register(@Args('dto') dto: LoginAuthDto): Promise<any> {
    let registeredUser: any
    try {
      registeredUser= await this.authService.register(dto);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return registeredUser;
  }

}
