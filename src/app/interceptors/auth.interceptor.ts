import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // As we work with SSR, localstorage is not exist in a server.
  // Therefore, we must ensure that we are on the client side before requesting an item from localStorage
  const platformId = inject(PLATFORM_ID);
  if (isPlatformServer(platformId)) return next(req);

  // This inject does not work and it throws an error, despite the fact that we are on the client side
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');
  let headers = req.headers.set('Content-Type:', 'application/json');

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  const authReq = req.clone({ headers });
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 403) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            localStorage.setItem('token', newToken);
            const updateHeaders = req.headers.set(
              'Authorization',
              `Bearer ${newToken}`
            );
            const newRequest = req.clone({ headers: updateHeaders });
            return next(newRequest);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
