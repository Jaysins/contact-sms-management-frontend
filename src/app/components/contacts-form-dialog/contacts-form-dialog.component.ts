import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContactsService} from "../../services/contacts/contacts.service";
import {Route, Router} from "@angular/router";
import {SnackbarService} from "../../services/helper/snackbar";

import {Group} from "../../models/general.models";

@Component({
  selector: 'app-contact-form-dialog',
  templateUrl: './contacts-form-dialog.component.html',
  styleUrls: ['./contacts-form-dialog.component.css']
})
export class ContactsFormDialogComponent {
  name = '';
  groups: Group[] = []; // Replace 'Group' with the appropriate type for your groups
  selectedGroup: string = '';
  phoneNumber = '';

  constructor(
    private contactsService: ContactsService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<ContactsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groups = data.groups;
  }

  onSaveClick(): void {
    // Handle the saving of contact data and interaction with the backend here
    // You can call a service to save the contact data to the backend
    // Display a success message if the request is successful
    // Close the dialog
    if (!this.name || !this.phoneNumber) {
      this.snackBarService.showSnackbar("Name and Phone number required");
      return
    }
    this.contactsService.createContact({name: this.name, phoneNumber: this.phoneNumber,
      group: this.selectedGroup}).subscribe(
      {
        next: response => {
          this.dialogRef.close({success: true});
          window.location.reload();
        },
        error: error => {
          this.snackBarService.showSnackbar(error.error.msg);
        }
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
