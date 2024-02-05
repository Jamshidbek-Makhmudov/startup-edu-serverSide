import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { User as UserDecorator } from 'src/user/decorators/user.decorator';
import { EmailAndPasswordDto, UpdateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import Stripe from 'stripe';

// @Resolver("user")
@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  /**find user by id */
  @Query(() => User) //get
  async getProfile(@UserDecorator('_id') _id: string): Promise<User> {
    return this.userService.byId(_id);
  }

  /**edit user's password */
  @Mutation(() => String, { description: "edit user's password" })
  async editPassword(@Args('editPassword') dto: EmailAndPasswordDto): Promise<string> {
    return this.userService.editPassword(dto);
  }
  /**update user  */
  @Mutation(() => User, { description: 'update an existing user' })
  @Auth()
  async updateUser(@Args('updateUser') dto: UpdateUserDto, @UserDecorator('_id') _id: string) {
    return this.userService.updateUser(dto, _id);
  }
  /**transactions  */
  @Query(() => [String], { description: "getrs user's transactions" })
  @Auth()
  async allTransactions(@UserDecorator('customerId') customerId: string): Promise<Stripe.Charge[]> {
    return this.userService.allTransactions(customerId);
  }
  /**my-courses  */
  // @Query(()=>[Course], { description: "getrs user's courses" })
  // @Auth()
  // async myCourses(@UserDecorator("_id") _id:string):Promise<Course[]> {
  //   return this.userService.myCourses(_id);
  // }

  //Query       => get
  //Mutation    =>//create update delete
}