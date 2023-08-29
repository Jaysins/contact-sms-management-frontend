// src/app/senderId.service.ts
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SenderIdService {
  private serviceUrl = `${environment.apiUrl}/senderIds`;
  constructor(private http: HttpClient) {
  }

  getSenderIds(): Observable<any> {

    return this.http.get(`${this.serviceUrl}`);
  }

  getSenderIdGroups(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/senderIdGroups`);
  }
  deleteSenderId(senderId: string): Observable<any> {

    return this.http.delete(`${this.serviceUrl}/${senderId}`);
  }
  createSenderId(senderIdData: any): Observable<any> {

    return this.http.post(`${this.serviceUrl}`, senderIdData);
  }

}
