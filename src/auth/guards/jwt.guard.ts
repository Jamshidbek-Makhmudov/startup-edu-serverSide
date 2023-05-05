import { AuthGuard } from '@nestjs/passport';

//foydalamuvchi royhatdan otganmi yoqmi tekshirib beradigan function yozamiz
export class JwtAuthGuard extends AuthGuard('jwt') {}
