// src/app/components/add-to-group-dialog/add-to-group-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Contact} from "../../models/contacts.models";
import {ContactsService} from "../../services/contacts/contacts.service";
import {SnackbarService} from "../../services/helper/snackbar";
import {Group} from "../../models/general.models";

@Component({
  selector: 'app-contacts-group-dialog',
  templateUrl: './contacts-group-dialog.component.html',
  styleUrls: ['./contacts-group-dialog.component.css']
})

export class  ContactsGroupDialogComponent{
  selectedGroup: string = '';
  groups: Group[] = []; // Replace 'Group' with the appropriate type for your groups
  selectedContacts: Contact[] = []; // Replace 'Group' with the appropriate type for your groups

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private contactsService: ContactsService,
              private snackBarService: SnackbarService) {
    this.groups = data.groups; // Pass in the list of groups to the dialog
    this.selectedContacts = data.selectedContacts;
  }

  addToGroup() {

    if (!this.selectedGroup){
      this.snackBarService.showSnackbar("Please select group");
      return
    }
    const contactIds: string[] = []

    this.selectedContacts.map(contact => {contactIds.push(contact["id"])})

    this.contactsService.addToContactGroup({contacts: contactIds, groupCode: this.selectedGroup}).subscribe(
      () => {
        window.location.reload();
        this.snackBarService.showSnackbar("Success");
      },
      (error: any) => {
        this.snackBarService.showSnackbar(error.error.msg);
      }
    );
  }
}
