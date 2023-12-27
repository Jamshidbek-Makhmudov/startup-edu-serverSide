import { applyDecorators, UseGuards } from '@nestjs/common';

import { OnlyAdminGuard } from 'src/auth/common/guards/admin.guard';
import { OnlyInstructorGuard } from 'src/auth/common/guards/instructor.guard';
import { JwtAuthGuard } from 'src/auth/common/guards/jwt.guard';
import { RoleUser } from 'src/user/dto/user.dto';
//auth ya'ni kirish uchun decoratori yasaymiz: user kimligini aniqlab eradi
export const Auth = (role: RoleUser = 'USER') => {
  return applyDecorators(
    (role === 'ADMIN' && UseGuards(JwtAuthGuard, OnlyAdminGuard)) ||
      (role === 'USER' && UseGuards(JwtAuthGuard)) ||
      (role === 'INSTRUCTOR' && UseGuards(JwtAuthGuard, OnlyInstructorGuard)),
  );
};
