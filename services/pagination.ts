export interface PaginatedRequest {
  offset: number;
  limit: number;
};

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  total: number;
}