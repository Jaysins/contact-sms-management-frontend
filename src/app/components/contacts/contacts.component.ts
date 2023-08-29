// src/app/components/contacts/contacts.component.ts

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {ContactsService} from '../../services/contacts/contacts.service';
import {ContactsFormDialogComponent} from '../contacts-form-dialog/contacts-form-dialog.component';
import {SnackbarService} from "../../services/helper/snackbar";
import {Contact} from "../../models/contacts.models";
import {ContactsGroupDialogComponent} from "../contacts-group-dialog/contacts-group-dialog.component";
import {MessageDialogComponent} from "../message-dialog/message-dialog.component";
import {SenderIdService} from "../../services/senderId/senderId.service";
import {SenderId} from "../../models/senderId.models";
import {Group} from "../../models/general.models";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  contacts: Contact[] = []; // Array to store fetched contacts
  contactGroups: Group[] = []
  senderIds: SenderId[] = []

  constructor(private contactsService: ContactsService, private dialog: MatDialog,
              private snackBarService: SnackbarService, private senderIdService: SenderIdService) {
  }

  ngOnInit() {
    this.fetchContacts();
    this.fetchContactGroups();
    this.fetchSenderIds();
  }

  hasSelectedContacts(): boolean {
    return this.contacts.some(contact => contact.selected);
  }

  fetchContacts() {
    this.contactsService.getContacts().subscribe(
      {
        next: response => {
          this.contacts = response["results"];
        },
        error: error => {
          console.error('Error fetching contacts:', error);
        }
      }
    );
  }

  fetchContactGroups() {
    this.contactsService.getContactGroups().subscribe({
      next: response => {
        this.contactGroups = response["results"];
      },
      error: error => {
        this.snackBarService.showSnackbar(error.error.msg);
      }
    })
  }

  deleteContact(contactId: string){

    this.contactsService.deleteContact(contactId).subscribe({
      next: response => {
        this.snackBarService.showSnackbar("success")
        window.location.reload()
      },
      error: error => {
        this.snackBarService.showSnackbar(error.error.msg)
      }

    })
  }
  openContactFormDialog() {

    const dialogRef = this.dialog.open(ContactsFormDialogComponent, {
      width: '500px',
      data: {groups: this.contactGroups}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.snackBarService.showSnackbar("Success");
      }
    });
  }

  openAddToGroupDialog() {

    const selectedContacts = this.contacts.filter(contact => contact.selected);
    this.dialog.open(ContactsGroupDialogComponent, {
      width: '400px',
      data: {groups: this.contactGroups, selectedContacts: selectedContacts}, // Pass in the fetched list of groups
    });

  }

  openMessageDialog() {
    if (this.senderIds.length < 1){
      return this.snackBarService.showSnackbar("Please create a sender ID")
    }
    const selectedContacts = this.contacts.filter(contact => contact.selected);
    if (!selectedContacts){
      return
    }

    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      data: {selectedContacts: selectedContacts, senderIds: this.senderIds}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.snackBarService.showSnackbar("Success");
      }
    });
  }

  fetchSenderIds() {
    this.senderIdService.getSenderIds().subscribe({
      next: response => {
        this.senderIds = response["results"];
      },
      error: error => {
        this.snackBarService.showSnackbar(error.error.msg);
      }
    })
  }

}
