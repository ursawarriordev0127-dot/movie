import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: User): Promise<AuthResponseDto> {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.logger.log(`JWT token generated for user ${user.email}`);
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async signUp(email: string, password: string): Promise<AuthResponseDto> {
    this.logger.log(`Signup attempt for email: ${email}`);
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      this.logger.warn(`Signup failed: User with email ${email} already exists`);
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.usersService.create(email, password);
    this.logger.log(`User ${email} signed up successfully, generating token`);
    return this.login(user);
  }

  async validateToken(userId: string): Promise<User | null> {
    return this.usersService.findById(userId);
  }
}

