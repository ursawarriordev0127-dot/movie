import { Movie } from '../entities/movie.entity';

export class MovieResponseDto {
  id: string;
  title: string;
  publishing_year: number;
  poster_url: string | null;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  static fromEntity(movie: Movie): MovieResponseDto {
    const dto = new MovieResponseDto();
    dto.id = movie.id;
    dto.title = movie.title;
    dto.publishing_year = movie.publishing_year;
    dto.poster_url = movie.poster_url;
    dto.user_id = movie.user_id;
    dto.created_at = movie.created_at;
    dto.updated_at = movie.updated_at;
    return dto;
  }

  static fromEntities(movies: Movie[]): MovieResponseDto[] {
    return movies.map((movie) => this.fromEntity(movie));
  }
}

