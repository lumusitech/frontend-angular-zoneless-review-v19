import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from 'express';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // "Remember, do not hardcode this because the URL changes dynamically depending on
  // whether we are in production or development."
  // baseURL = process.env.BASE_URL
  // In this example, for simplification, it is hardcoded.
  baseUrl = 'http://localhost:4000';
  http = inject(HttpClient);
  router = inject(Router);

  refreshToken(): Observable<string> {
    const token = localStorage.getItem('refreshToken');

    if (!token) {
      this.logout();
      return throwError(() => new Error('Token not found'));
    }

    return this.http
      .post<{ token: string }>(`${this.baseUrl}/auth/refresh`, {
        token,
      })
      .pipe(
        map((res) => res.token),
        tap((newToken) => localStorage.setItem('token', newToken)),
        catchError((err) => {
          this.logout();
          return throwError(() => err);
        })
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  login() {}

  constructor() {}
}
