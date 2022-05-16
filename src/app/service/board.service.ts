import { Injectable } from '@angular/core';
import {Observable, of, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {switchMap} from "rxjs/operators";
import {Board, BoardForm, BoardItem, ModifyForm} from "../models/board";
import {HttpClient} from "@angular/common/http";
import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  getBoardList$ = new Subject();

  constructor(private http: HttpClient) { }

  /**
   * 게시글 작성
   * @param form
   */
  boardWrite(form: BoardForm): Observable<number> {
    const url = environment.apiHost + '/api/back/board/insertPost';
    return this.http.post<number>(url, form).pipe(
      switchMap(res => {
        if(res === 1) {
          return of(res);
        }
        return throwError(res);
      })
    );
  }

  /**
   * 게시판 리스트 조회
   * @param page
   */
  getBoardList(page: Page): Observable<Board> {
    const params = {
      page_limit: page.pageLimit,
      page_offset: page.pageOffset
    }
    const url = environment.apiHost + '/api/back/board/getBoardList';
    return this.http.get<Board>(url, {params}).pipe(
      switchMap(res => {
        if(res) {
          return of(res);
        }
        return throwError(res);
      })
    );
  }

  /**
   * 게시글 삭제
   * @param idx
   */
  boardDelete(idx: number):Observable<number>{
    const url = environment.apiHost + '/api/back/board/deletePost?idx=' + idx;
    return this.http.post<number>(url, '').pipe(
      switchMap(res => {
        if(res === 1) {
          return of(res);
        }
        return throwError(res);
      })
    );
  }

  /**
   * 게시글 조회
   * @param idx
   */
  getBoardDetail(idx: number): Observable<BoardItem> {
    const url = environment.apiHost + '/api/back/board/getPostHit?idx=' + idx;
    return this.http.get<BoardItem>(url).pipe(
      switchMap(res => {
        if(res) {
          return of(res);
        }
        return throwError(res);
      })
    );
  }

  /**
   * 게시글 수정
   * @param form
   */
  boardModify(form: ModifyForm): Observable<number> {
    const url = environment.apiHost + '/api/back/board/updatePost';
    return this.http.post<number>(url, form).pipe(
      switchMap(res => {
        if(res === 1) {
          return of(res);
        }
        return throwError(res);
      })
    );
  }

}
