import { IsString, IsInt, Min, Max, IsOptional, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear() + 10)
  publishing_year: number;

  @IsOptional()
  @IsUrl()
  poster_url?: string;
}

