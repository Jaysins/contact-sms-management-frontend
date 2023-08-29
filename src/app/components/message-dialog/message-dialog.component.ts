// src/app/components/add-to-group-dialog/add-to-group-dialog.component.ts

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Contact} from "../../models/contacts.models";
import {ContactsService} from "../../services/contacts/contacts.service";
import {MessageService} from "../../services/message/message.service";
import {SnackbarService} from "../../services/helper/snackbar";
import {SenderId} from "../../models/senderId.models";
import {Group} from "../../models/general.models";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})

export class MessageDialogComponent {
  selectedGroups: Group[] = [];
  selectedContacts: Contact[] = [];
  senderIds: SenderId[] = [];
  content = "";
  selectedSenderId = ""

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService,
              private snackBarService: SnackbarService, public dialogRef: MatDialogRef<MessageDialogComponent>,) {
    this.selectedContacts = data.selectedContacts;
    this.selectedGroups = data.selectedGroups;
    this.senderIds = data.senderIds;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (!this.content) {
      this.snackBarService.showSnackbar("Please type in message")
    }
    const selectedContacts: string[] = []
    const selectedContactGroups: string[] = []

    this.selectedContacts?.map(contact => {
      selectedContacts.push(contact["id"])
    })
    this.selectedGroups?.map(contactGroup => {
      selectedContactGroups.push(contactGroup["id"])
    })

    const recipients: { contactIds?: string[], contactGroupIds?: string[], content?: string, senderId: string} = {senderId: this.selectedSenderId}
    if (selectedContacts) {
      recipients["contactIds"] = selectedContacts
    }

    if (selectedContactGroups) {
      recipients["contactGroupIds"] = selectedContactGroups
    }

    if (Object.keys(recipients).length < 1) {
      this.snackBarService.showSnackbar("Please select recipients");
      return
    }

    recipients["content"] = this.content

    this.messageService.sendMessage(recipients).subscribe({
        next: response => {
          window.location.reload();
          this.snackBarService.showSnackbar("Success")
        },
        error: error => this.snackBarService.showSnackbar(error.error.msg)
      }
    );

  }

}
