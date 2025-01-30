import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // As we work with SSR, localstorage is not exist in a server. 
  // Therefore, we must ensure that we are on the client side before requesting an item from localStorage
  const platformId = inject(PLATFORM_ID)

  if(isPlatformServer(platformId)) return next(req)

  const token = localStorage.getItem("token")

  let headers = req.headers.set('Content-Type:', 'application/json')

  if(token) {
    headers = headers.set('Authorization', `Bearer ${token}`)
  }

  const authReq = req.clone({headers})

  return next(authReq);
};
