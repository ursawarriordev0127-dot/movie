import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { createFileUploadInterceptor } from '../common/interceptors/file-upload.interceptor';
import { MAX_FILE_SIZE } from '../common/constants';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(createFileUploadInterceptor())
  async create(
    @CurrentUser() user: { id: string },
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    let posterUrl = null;
    if (file) {
      posterUrl = `/uploads/posters/${file.filename}`;
    }

    return this.moviesService.create(
      { ...createMovieDto, poster_url: posterUrl },
      user.id,
    );
  }

  @Get()
  async findAll(@Query() query: PaginationDto, @CurrentUser() user: { id: string }) {
    return this.moviesService.findAll(query, user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(createFileUploadInterceptor())
  async update(
    @Param('id') id: string,
    @CurrentUser() user: { id: string },
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    let posterUrl = updateMovieDto.poster_url || undefined;
    if (file) {
      posterUrl = `/uploads/posters/${file.filename}`;
    }

    return this.moviesService.update(
      id,
      { ...updateMovieDto, poster_url: posterUrl },
      user.id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.moviesService.remove(id, user.id);
  }
}

