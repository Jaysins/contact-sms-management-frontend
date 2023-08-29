// src/app/senderId.service.ts
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MessageService {
  private messageUrl = `${environment.apiUrl}/messages`;

  constructor(private http: HttpClient) {
  }

  getMessages(): Observable<any> {

    return this.http.get(`${this.messageUrl}`);
  }
  sendMessage(messageData: any): Observable<any> {

    return this.http.post(`${this.messageUrl}`, messageData);
  }

}
