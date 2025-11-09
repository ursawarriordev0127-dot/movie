'use client';

import React from 'react';
import { PaginationMeta } from '@/src/types';

interface PaginationProps {
  pagination: PaginationMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  currentPage,
  onPageChange,
}) => {
  const { totalPages, hasMore } = pagination;

  // Don't show pagination if there are no pages
  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="text-white [font-family:'Montserrat',Helvetica] font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
      >
        Prev
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`min-w-[40px] h-[40px] px-3 rounded-[4px] [font-family:'Montserrat',Helvetica] font-bold text-base transition-all ${
                currentPage === pageNum
                  ? 'bg-[#2bd17e] text-white hover:bg-[#2bd17e]/90'
                  : 'bg-[#092c39] text-white hover:bg-[#092c39]/80'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="text-white [font-family:'Montserrat',Helvetica] font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
      >
        Next
      </button>
    </div>
  );
};
