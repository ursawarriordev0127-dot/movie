import { PaginationMeta, PaginationQuery } from '../interfaces/pagination.interface';

export const createPaginationMeta = (
  page: number,
  limit: number,
  total: number,
): PaginationMeta => {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasMore: page < totalPages,
  };
};

export const getPaginationParams = (query: PaginationQuery) => {
  const page = query.page || 1;
  const limit = query.limit || 8;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

