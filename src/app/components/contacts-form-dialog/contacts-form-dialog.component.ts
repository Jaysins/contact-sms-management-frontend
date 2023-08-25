// src/app/components/contact-form-dialog/contact-form-dialog.component.ts

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContactsService} from "../../services/contacts/contacts.service";
import {Route, Router} from "@angular/router";
import {SnackbarService} from "../../services/helper/snackbar";

@Component({
  selector: 'app-contact-form-dialog',
  templateUrl: './contacts-form-dialog.component.html',
  styleUrls: ['./contacts-form-dialog.component.css']
})
export class ContactsFormDialogComponent {
  name = '';
  phoneNumber = '';

  constructor(
    private contactsService: ContactsService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<ContactsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onSaveClick(): void {
    // Handle the saving of contact data and interaction with the backend here
    // You can call a service to save the contact data to the backend
    // Display a success message if the request is successful
    // Close the dialog
    if (!this.name || !this.phoneNumber) {
      return
    }
    this.contactsService.createContact({name: this.name, phoneNumber: this.phoneNumber}).subscribe(
      () => {
        // window.location.reload();
      },
      (error: any) => {
        this.snackBarService.showSnackbar(error.error.msg);
        return
      }
    );

    this.dialogRef.close({success: true});
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
