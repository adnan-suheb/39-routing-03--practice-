import { Injectable } from '@angular/core';
import { Iuser } from '../model/users.interface';
import { usersData } from '../model/users.const';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersArr: Iuser[] = usersData;


  constructor(
    private _router: Router,
    private _snackbar: SnackBarService,
    private _dialog: DialogService
  ) { }

  fetchAllUsers(): Iuser[] {
    return this.usersArr
  }

  getSingleUserObj(id: string) {
    return this.usersArr.find(user => user.userId === id) as Iuser;
  }

  addUser(data: Iuser) {
    this.usersArr.push(data)
    this._router.navigate(['/users']);
    this._snackbar.openSnackbar(`New user ${data.userName} added successfully!!!`)
  }

  updateUser(data: Iuser) {
    let index = this.usersArr.findIndex(user => user.userId === data.userId)
    this.usersArr[index] = data;
    this._snackbar.openSnackbar(`${data.userName} updated successfully!!!`);
    this._router.navigate(['/users'])
  }

  onRemove(userId: string) {
    let index = this.usersArr.findIndex(user => user.userId === userId);
    let obj = this.usersArr[index];
    this._dialog.openDialog("Confirmation",
      `Are you sure you want to remove ${obj.userName}?`
    ).subscribe(res => {
      if (res) {
        this.usersArr.splice(index, 1);
        this._snackbar.openSnackbar(`${obj.userName} removed successfully!!!`);
        this._router.navigate(['/users'])
      }

    })

  }
}
