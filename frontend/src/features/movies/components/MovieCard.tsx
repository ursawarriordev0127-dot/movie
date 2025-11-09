'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Movie } from '@/src/types';
import { getImageUrl } from '@/src/utils/image';
import { ROUTES } from '@/src/constants';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();
  const posterUrl = getImageUrl(movie.poster_url);

  return (
    <div
      onClick={() => router.push(ROUTES.EDIT_MOVIE(movie.id))}
      className="bg-card-color rounded-[12px] cursor-pointer hover:scale-[1.02] transition-transform duration-200 p-2"
    >
      <div className="w-full h-[400px] bg-input-color rounded-[12px] mb-4 overflow-hidden relative">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 bg-input-color">
            <div className="text-center">
              <div className="text-4xl mb-2">🎬</div>
              <div className="text-sm">No poster</div>
            </div>
          </div>
        )}
      </div>
      <div className="px-2 pb-2">
        <h3 className="[font-family:'Montserrat',Helvetica] font-medium text-white text-xl tracking-[0] leading-8 mb-1">
          {movie.title}
        </h3>
        <p className="[font-family:'Montserrat',Helvetica] font-normal text-white/60 text-base tracking-[0] leading-6">
          {movie.publishing_year}
        </p>
      </div>
    </div>
  );
};

