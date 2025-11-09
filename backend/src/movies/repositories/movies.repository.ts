import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
  ) {}

  async create(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.repository.create(movieData);
    return this.repository.save(movie);
  }

  async findOne(id: string): Promise<Movie | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(skip: number, take: number, userId?: string): Promise<[Movie[], number]> {
    const where = userId ? { user_id: userId } : {};
    return this.repository.findAndCount({
      where,
      order: { created_at: 'DESC' },
      skip,
      take,
    });
  }

  async update(id: string, updateData: Partial<Movie>): Promise<Movie> {
    await this.repository.update(id, updateData);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error('Movie not found after update');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

