import {Injectable} from '@angular/core';
import {Auth, User} from "../models/user";
import {Observable, of, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {switchMap} from "rxjs/operators";
import {CommonService} from "../shared/service/common.service";
import {StorageType} from "../models/storage.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private commonService: CommonService) { }

  get accessToken(): string {
    return this.commonService.getStorage(StorageType.AccessToken) || '';
  }

  get refreshToken(): string {
    return this.commonService.getStorage(StorageType.RefreshToken) || '';
  }

  /**
   * 로그인
   * @param form
   */
  login(form: User): Observable<Auth> {
    const url = environment.apiHost + '/api/back/user/login';
    return this.http.post<Auth>(url, form).pipe(
      switchMap(res => {
        if(res.accessToken) {
          this.commonService.setStorage(StorageType.AccessToken, res.accessToken);
          this.commonService.setStorage(StorageType.RefreshToken, res.refreshToken);
          return of(res);
        }
        return throwError(res);
      })
    );
  }

  /**
   * 회원가입
   * @param form
   */
  signUp(form: User): Observable<number> {
    const url = environment.apiHost + '/api/back/user/insertUser';
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
   * 아이디 중복 확인
   * @param id
   */
  idDoubleChk(id: String): Observable<number> {
    const url = environment.apiHost + '/api/back/user/existsId?id=' + id;
    return this.http.get<number>(url).pipe(
      switchMap(res => {
        if(res === 0) {
          return of(res);
        }
        return throwError(res);
      })
    );
  }

  /**
   * 로그아웃
   */
  logout(): Observable<any> {
    const url = environment.apiHost + '/api/back/user/logout';
    return this.http.post<any>(url, null).pipe(
      switchMap(res => {
        return of (res);
      })
    );
  }
}
