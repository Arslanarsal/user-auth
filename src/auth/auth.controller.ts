import { Body, Controller, Post, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard("local-user"))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user.id);
  }


  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refresh(@Request() req) {
    return this.authService.refresh(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }
}
