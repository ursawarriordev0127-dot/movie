import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });
    this.logger.log(`User created successfully: ${user.email} (ID: ${user.id})`);
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneById(id);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      this.logger.warn(`Login attempt failed: User with email ${email} not found`);
      return null;
    }
    
    // Ensure password is hashed (starts with bcrypt prefix)
    if (!user.password || (!user.password.startsWith('$2') && user.password.length < 20)) {
      // Password is not properly hashed, cannot validate
      this.logger.warn(`Login attempt failed: Password for user ${email} is not properly hashed`);
      return null;
    }
    
    // Validate password
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Login attempt failed: Invalid password for user ${email}`);
        return null;
      }
      this.logger.log(`Password validated successfully for user ${email}`);
    } catch (error) {
      // Error comparing password (e.g., invalid hash format)
      this.logger.error(`Error comparing password for user ${email}:`, error);
      return null;
    }
    
    this.logger.log(`User ${email} validated successfully`);
    return user;
  }
}

