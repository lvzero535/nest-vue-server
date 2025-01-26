import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ISecurityConfig, securityRegToken } from '@/config/security.config';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthTestController } from './test/authTest.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountController } from './controllers/account.controller';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [
    UserModule,
    MenuModule,
    /**
     * https://github.com/nestjs/jwt/blob/master/README.md
     */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { jwtSecret, jwtExpire } =
          configService.get<ISecurityConfig>(securityRegToken);
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: `${jwtExpire}s`,
          },
        };
      },
    }),
  ],
  controllers: [AuthController, AuthTestController, AccountController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
