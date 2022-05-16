export interface Page {
  currentPage: number; // 현재 페이지
  pageLimit: number; // 표출 할 게시글 수
  pageOffset: number; // 기준점
  total: number; // 총 게시글 수
  totalPage: number; // 총 페이지 수
}
