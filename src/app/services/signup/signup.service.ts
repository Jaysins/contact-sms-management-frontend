// src/app/login.service.ts
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SignupService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
