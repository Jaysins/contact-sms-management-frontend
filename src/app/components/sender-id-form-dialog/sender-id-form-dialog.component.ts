// src/app/components/contact-form-dialog/contact-form-dialog.component.ts

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContactsService} from "../../services/contacts/contacts.service";
import {Route, Router} from "@angular/router";
import {SnackbarService} from "../../services/helper/snackbar";

import {Group} from "../../models/general.models";
import {SenderIdService} from "../../services/senderId/senderId.service";

@Component({
  selector: 'app-contact-form-dialog',
  templateUrl: './sender-id-form-dialog.component.html',
  styleUrls: ['./sender-id-form-dialog.component.css']
})
export class SenderIdFormDialogComponent {
  name = '';
  groups: Group[] = []; // Replace 'Group' with the appropriate type for your groups
  selectedGroup: string = '';

  constructor(
    private senderIdService: SenderIdService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<SenderIdFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groups = data.groups;
  }

  onSaveClick(): void {
    if (!this.name || !this.selectedGroup) {
      this.snackBarService.showSnackbar("Name and group required");
      return
    }
    this.senderIdService.createSenderId({name: this.name, group: this.selectedGroup}).subscribe(
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
