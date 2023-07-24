import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // Login URL, accessible at POST /auth/login
  async login(@Body() user: User) {
    const authenticatedUser = await this.authService.validateUser(
      user.username,
      user.password,
    );

    if (authenticatedUser) {
      return this.authService.login(authenticatedUser);
    } else {
      return { message: 'Invalid credentials' };
    }
  }
}
