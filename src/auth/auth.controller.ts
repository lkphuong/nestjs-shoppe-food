import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local.auth.guard';
import { AuthService } from './auth.service';
import { Public } from './setMetadata';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refreshToken')
  async refreshToken(@Headers() headers) {
    const token: string = headers.authorization.replace('Bearer ', '');
    return this.authService.refreshToken(token);
  }
}
