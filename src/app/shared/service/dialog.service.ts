import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../component/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private _matDialog: MatDialog
  ) { }

  openDialog(title: string, message: string) {
    const _dialogRef = this._matDialog.open(DialogComponent, {
      width: '350px',
      data: { title, message }
    });
    return _dialogRef.afterClosed();
  }
}
