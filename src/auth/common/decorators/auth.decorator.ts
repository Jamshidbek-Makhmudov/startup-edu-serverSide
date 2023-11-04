import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleUser } from '../../dto/user.dto';
import { OnlyAdminGuard } from '../guards/admin.guard';
import { OnlyInstructorGuard } from '../guards/instructor.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
//auth ya'ni kirish uchun decoratori yasaymiz: user kimligini aniqlab eradi
export const Auth = (role: RoleUser = 'USER') => {
  return applyDecorators(
    (role === 'ADMIN' && UseGuards(JwtAuthGuard, OnlyAdminGuard)) ||
      (role === 'USER' && UseGuards(JwtAuthGuard)) ||
      (role === 'INSTRUCTOR' && UseGuards(JwtAuthGuard, OnlyInstructorGuard)),
  );
};
