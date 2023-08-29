// src/app/senderId.service.ts
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ContactsService {
  private contactsUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<any> {

    return this.http.get(`${this.contactsUrl}`);
  }
  getContactGroups(): Observable<any> {

    return this.http.get(`${environment.apiUrl}/contactGroups`);
  }

  createContact(contactData: any): Observable<any> {

    return this.http.post(`${this.contactsUrl}`, contactData);
  }

  deleteContact(contactId: string): Observable<any> {
    return this.http.delete(`${this.contactsUrl}/${contactId}`)
  }

  addToContactGroup(contactData: any): Observable<any> {

    return this.http.post(`${environment.apiUrl}/addToContactGroup`, contactData);
  }

}
