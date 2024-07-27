import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';  
import { AuthenticationService } from '../services/authentication/authentication.service';
import { environment } from '../../environments/env.const';
  
@Injectable()
  export class TokenInterceptor implements HttpInterceptor {
    private authService = inject(AuthenticationService);
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<string | null> =
      new BehaviorSubject<string | null>(null);
  
    intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      if (!request.url.startsWith(environment.apiBase)) {
        return next.handle(request);
      }
  
      const accessToken = this.authService._accessToken;
      if (accessToken && !this.isRefreshing) {
        request = this.addToken(request, accessToken);
      }
  
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && !request.url.includes('login')) {
            return this.handle401Error(request, next);
          }
  
          if (request.url.includes('refresh')) {
            this.authService.logoutUser();
          }
  
          return throwError(() => {
            return error;
          });
        })
      );
    }
  
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
  
        return this.authService.getRefreshToken$.pipe(
          switchMap(() => {
            const accessToken = this.authService._accessToken;
            this.isRefreshing = false;
            this.refreshTokenSubject.next(accessToken);
            return next.handle(this.addToken(request, accessToken));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            return throwError(() => error);
          }),
          finalize(() => {
            this.isRefreshing = false;
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => next.handle(this.addToken(request, token!)))
        );
      }
    }
  
    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
}