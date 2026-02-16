export type PaginationApiResponse<List> = {
  currentPage: number
  programs: List[]
  totalCount: number
  totalPages: number
}
