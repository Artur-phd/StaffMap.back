import { PaginationParamDto, PaginationQueryDto } from '../dtos';

export const getPaginationByQuery = (
  query: PaginationQueryDto,
): PaginationParamDto => ({
  skip: (Number(query.page) - 1) * Number(query.limit),
  take: Number(query.limit),
});

export const getPaginationMetadata = (
  query: PaginationQueryDto,
  total: number,
): { limit: number; page: number; total: number; totalPages: number } => ({
  limit: Number(query.limit),
  page: Number(query.page),
  total,
  totalPages: Math.ceil(total / Number(query.limit)) || 1,
});
