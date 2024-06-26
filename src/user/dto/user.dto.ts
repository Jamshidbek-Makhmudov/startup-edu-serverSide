import { UserDocument } from 'src/user/schemas/user.schema';

export type RoleUser = 'ADMIN' | 'INSTRUCTOR' | 'USER';
export type UserTypeData = keyof UserDocument;

export interface EmailAndPasswordDto {
  email: string;
  password: string;
}

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  birthday: string;
  job: string;
  bio: string;
  avatar: string;
}