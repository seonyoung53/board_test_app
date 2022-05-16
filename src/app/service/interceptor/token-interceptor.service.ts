import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {CommonService} from "../../shared/service/common.service";
import {StorageType} from "../../models/storage.type";
import {catchError, tap} from "rxjs/operators";
import {CommonUiService} from "../../shared/service/common-ui.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {ResultCode} from "../../models/response-container";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
  constructor(private commonService: CommonService,
              private commonUiService: CommonUiService,
              private router: Router,
              private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith('http') || !request.url.startsWith(environment.apiHost)) {
      return next.handle(request);
    }
    const token = 'Bearer ' + this.authService.accessToken;

    request = request.clone({
      setHeaders: {
        Accept: 'application/json; charset=utf-8',
        Authorization: token
      }
    });

    return next.handle(request).pipe(
      tap(async response => {
        if (response instanceof HttpResponse) {
          const httpRes: any = response;
          if (httpRes.body.code === ResultCode.Unauthorized) {
            const refreshToken = this.authService.refreshToken;
            this.commonService.setStorage(StorageType.AccessToken, refreshToken);
          }
        }
      }),
      catchError(response => {
        return throwError(response);
      })
    );
  }
}
