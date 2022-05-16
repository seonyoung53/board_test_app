export interface BoardForm {
  title: string;
  content: string;
}

export interface ModifyForm {
  title: string;
  content: string;
  idx: number;
}

export interface Board {
  search_option: string;
  search_word: string;
  order: null;
  column: null;
  offset: number;              // 기준점
  limit: number;               // 표출 게시글 수
  total: number;               // 총 게시글 수
  items: BoardItem[]
}

export interface BoardItem {
  num: number;
  idx: number;                // 게시글 번호
  title: string;              // 게시글 제목
  content: string;            // 게시글 내용
  writer: string;             // 게시글 작성자
  writeDate: Date;            // 게시글 작성시간
  id: string;                 // 로그인 한 id 값
  hit: number;                // 조회수
  group_hit: number;          // 그룹의 조회수
  state: number;              // 0 - 삭제된 게시글/ 1 - 생성된 게시글
  group_idx: number;          // 그룹 게시글 번호
  group_depth: number;        // 답변글 게시글 계층
  group_order: number;        // 그룹내 게시글 순서
  modify_enabled: boolean;
  delete_enabled: boolean;
  reply: string;              // 답글여부
}
