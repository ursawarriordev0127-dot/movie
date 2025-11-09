'use client';

import { LogOut, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { useAuth } from '@/src/providers';
import { useMovies, MovieList, Pagination } from '@/src/features/movies';
import { ROUTES, DEFAULT_LIMIT } from '@/src/constants';

export const Movies = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const { movies, loading, pagination, refetch } = useMovies({
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  const { signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Refetch when page changes
  React.useEffect(() => {
    if (page > 0) {
      refetch({ page, limit: DEFAULT_LIMIT });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Reset to page 1 and refetch when navigating back to this page (e.g., from create page)
  React.useEffect(() => {
    if (pathname === '/movies' && page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Ensure movies is always an array
  const moviesArray = Array.isArray(movies) ? movies : [];
  const isEmpty = !loading && moviesArray.length === 0;

  return (
    <div className="bg-[#093545] w-full min-h-screen relative">
      <img
        className="absolute bottom-0 left-0 w-full h-[111px]"
        alt="Vectors"
        src="/vectors.png"
      />

      <div className="relative z-10 px-[120px] py-[120px]">
        <div className="flex items-center justify-between mb-[120px]">
          <div className="flex items-center gap-3">
            <h1 className="font-h2 font-[number:var(--h2-font-weight)] text-white text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
              My movies
            </h1>
            <Button
              onClick={() => router.push(ROUTES.CREATE_MOVIE)}
              className="w-[32px] h-[32px] p-0 rounded-full bg-[#2bd17e] hover:bg-[#2bd17e]/90 flex items-center justify-center"
            >
              <Plus className="w-5 h-5 text-white" />
            </Button>
          </div>

          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="flex items-center gap-2 text-white hover:bg-white/10 [font-family:'Montserrat',Helvetica] font-bold text-base"
          >
            Logout
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        {isEmpty ? (
          <div className="text-center py-[120px]">
            <h2 className="font-h2 font-[number:var(--h2-font-weight)] text-white text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] mb-[40px] [font-style:var(--h2-font-style)]">
              Your movie list is empty
            </h2>
            <Button
              onClick={() => router.push(ROUTES.CREATE_MOVIE)}
              className="w-[202px] h-[56px] rounded-[10px] bg-[#2bd17e] hover:bg-[#2bd17e]/90 [font-family:'Montserrat',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-6"
            >
              Add a new movie
            </Button>
          </div>
        ) : (
          <>
            <MovieList movies={moviesArray} loading={loading} />
            <Pagination
              pagination={pagination}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

