import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/user.service';
import { TokenDto } from 'src/modules/users/dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getByUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
      throw new BadRequestException();
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.group.id,
    };
    const refresh_token = await this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: process.env.EXPIRES_IN_REFRESH,
    });
    const tokenDto: TokenDto = {
      refreshToken: refresh_token,
    };
    await this.userService.refreshToken(user.id, tokenDto);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token,
    };
  }

  async logout(id: number) {
    const user = await this.userService.removeRefreshToken(id);
    if (user.affected === 1) {
      return user;
    }
    throw new BadRequestException();
  }

  async refreshToken(token: string) {
    const user = await this.userService.findByRefreshToken(token);
    const payload = {
      id: user.id,
      username: user.username,
      role: user.group.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
