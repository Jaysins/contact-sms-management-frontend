// src/app/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
