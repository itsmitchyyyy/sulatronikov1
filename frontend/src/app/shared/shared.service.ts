import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(message?: string, action?: string, options?: MatSnackBarConfig) {
    const _message = message ? message : 'Retrieving data from server. Please wait..';
    const _action = action;
    const _options: MatSnackBarConfig = {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      ...options
    }
    this.snackBar.open(_message, _action, _options);
  }
}
