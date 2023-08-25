// src/app/components/contacts/contacts.component.ts

import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../../services/contacts/contacts.service';
import {MatDialog} from "@angular/material/dialog";
import {ContactsFormDialogComponent} from '../contacts-form-dialog/contacts-form-dialog.component';
import {SnackbarService} from "../../services/helper/snackbar";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any[] = []; // Array to store fetched contacts
  contactGroups: any[] = []
  constructor(private contactsService: ContactsService, private dialog: MatDialog,
              private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.fetchContacts();
  }

  hasSelectedContacts(): boolean {
    return this.contacts.some(contact => contact.selected);
  }

  fetchContacts() {
    this.contactsService.getContacts().subscribe(
      (response: any) => {
        this.contacts = response.results; // Assign fetched contacts to the array
      },
      (error: any) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  fetchContactGroups() {
    this.contactsService.getContacts().subscribe(
      (response: any) => {
        this.contacts = response.results; // Assign fetched contacts to the array
      },
      (error: any) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  openContactFormDialog() {
    const dialogRef = this.dialog.open(ContactsFormDialogComponent, {
      width: '500px' // Set the width of the dialog as desired
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.snackBarService.showSnackbar("Success");
      }
    });
  }

  addToGroupSelectedContacts() {
    // Implement logic to add selected contacts to a group
    const selectedContacts = this.contacts.filter(contact => contact.selected);
    console.log('Adding selected contacts to a group:', selectedContacts);
  }

  sendMessageSelectedContacts() {
    // Implement logic to send message to selected contacts
    const selectedContacts = this.contacts.filter(contact => contact.selected);
    console.log('Sending message to selected contacts:', selectedContacts);
  }
}
