import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ 
      where: { email },
      select: ['id', 'email', 'password', 'created_at', 'updated_at']
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}

