import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/user.service';
import { jwtConstants } from 'src/common/constants/constants';
import { TokenDto } from 'src/modules/users/dto/token.dto';
import { formatUser } from 'src/common/utils/format/userFormated';

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
      secret: jwtConstants.secret,
      expiresIn: '3d',
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
