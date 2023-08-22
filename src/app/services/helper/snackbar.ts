import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {
  }

  showSnackbar(message: string) {
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(message, 'Dismiss', {
      duration: 300000,
      verticalPosition: verticalPosition,
      panelClass: ['top-snackbar']
    });
  }
}
