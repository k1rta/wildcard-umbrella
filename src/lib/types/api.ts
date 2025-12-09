export interface ApiResponse<T> {
  data: T
  error?: string
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number
  totalPages: number
  totalItems: number
}

export interface DateRangeParams {
  startDate?: string
  endDate?: string
}
