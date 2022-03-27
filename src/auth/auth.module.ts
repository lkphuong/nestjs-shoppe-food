import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.stategy';
import { AuthController } from './auth.controller';
import { AppConfigModule } from 'src/config/app/app.module';
@Module({
  imports: [
    AppConfigModule,
    UserModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: `${process.env.SECRET_KEY}`,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
