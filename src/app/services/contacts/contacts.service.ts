// src/app/contacts.service.ts
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ContactsService {
  private apiUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<any> {

    return this.http.get(`${this.apiUrl}`);
  }
  createContact(contactData: any): Observable<any> {

    return this.http.post(`${this.apiUrl}`, contactData);
  }

}
