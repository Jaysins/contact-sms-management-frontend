import {Component} from '@angular/core';
import {SenderIdService} from "../../services/senderId/senderId.service";
import {SenderId} from "../../models/senderId.models";
import {SnackbarService} from "../../services/helper/snackbar";
import {ContactsGroupDialogComponent} from "../contacts-group-dialog/contacts-group-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SenderIdFormDialogComponent} from "../sender-id-form-dialog/sender-id-form-dialog.component";
import {Group} from "../../models/general.models";

@Component({
  selector: 'app-sender-id',
  templateUrl: './sender-id.component.html',
  styleUrls: ['./sender-id.component.css']
})
export class SenderIdComponent {

  senderIds: SenderId[] = [];
  senderIdGroups: Group[] = []
  constructor(private senderIdService: SenderIdService, private snackBarService: SnackbarService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchSenderIds();
    this.fetchSenderIdGroups();
  }

  hasSelectedSenderId(): boolean {
    return this.senderIds.some(senderId => senderId.selected);
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
  fetchSenderIdGroups() {
    this.senderIdService.getSenderIdGroups().subscribe({
      next: response => {
        this.senderIdGroups = response["results"];
      },
      error: error => {
        this.snackBarService.showSnackbar(error.error.msg);
      }
    })
  }

  openSenderIdDialog(){
    this.dialog.open(SenderIdFormDialogComponent, {
      width: '400px',
      data: {groups: this.senderIdGroups}
    });

  }
  deleteSenderId(senderId: string){
    this.senderIdService.deleteSenderId(senderId).subscribe({
      next: response => {
        this.snackBarService.showSnackbar("Success")
      },
      error: error => {
        this.snackBarService.showSnackbar(error.error.msg)
      }
    })
  }
}
