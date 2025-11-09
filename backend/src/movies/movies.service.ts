import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repositories/movies.repository';
import { PaginationQuery, PaginatedResponse } from '../common/interfaces/pagination.interface';
import { createPaginationMeta, getPaginationParams } from '../common/utils/pagination.util';
import { MovieResponseDto } from './dto/movie-response.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async create(createMovieDto: CreateMovieDto, userId: string): Promise<MovieResponseDto> {
    const movie = await this.moviesRepository.create({
      ...createMovieDto,
      user_id: userId,
    });
    return MovieResponseDto.fromEntity(movie);
  }

  async findAll(query: PaginationQuery, userId?: string): Promise<PaginatedResponse<MovieResponseDto>> {
    const { page, limit, skip } = getPaginationParams(query);
    const [data, total] = await this.moviesRepository.findAll(skip, limit, userId);
    const meta = createPaginationMeta(page, limit, total);

    return {
      data: MovieResponseDto.fromEntities(data),
      meta,
    };
  }

  async findOne(id: string): Promise<MovieResponseDto> {
    const movie = await this.moviesRepository.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return MovieResponseDto.fromEntity(movie);
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
    userId: string,
  ): Promise<MovieResponseDto> {
    const movie = await this.moviesRepository.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    if (movie.user_id !== userId) {
      throw new ForbiddenException('You can only update your own movies');
    }

    const updated = await this.moviesRepository.update(id, updateMovieDto);
    return MovieResponseDto.fromEntity(updated);
  }

  async remove(id: string, userId: string): Promise<void> {
    const movie = await this.moviesRepository.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    if (movie.user_id !== userId) {
      throw new ForbiddenException('You can only delete your own movies');
    }

    await this.moviesRepository.delete(id);
  }
}

