import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { JWT_STRATEGY } from '../../common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const secret = configService.get<string>('JWT_SECRET', 'your-secret-key');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
    this.logger.log(`JWT Strategy initialized with secret: ${secret ? '***' : 'NOT SET'}`);
  }

  async validate(payload: { sub: string; email: string }) {
    this.logger.log(`Validating JWT payload for user: ${payload.email} (ID: ${payload.sub})`);
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      this.logger.warn(`User not found for ID: ${payload.sub}`);
      throw new UnauthorizedException('User not found');
    }
    this.logger.log(`JWT validation successful for user: ${user.email}`);
    return { id: user.id, email: user.email };
  }
}

