// src/app/interceptors/auth-interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // URLs that don't require the auth token
    const publicUrls = ['/auth/login', '/auth/signup'];

    // Get the request URL
    const requestUrl = request.url;

    // Check if the request URL is in the publicUrls array
    const skipAuth = publicUrls.some(url => requestUrl.includes(url));

    // Clone the request and add the authorization header if not skipping auth
    const authRequest = skipAuth
      ? request // No auth token for public URLs
      : request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });

    // Pass the cloned request to the next handler
    return next.handle(authRequest);
  }
}
