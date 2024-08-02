import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/users.interface';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.scss']
})
export class UserDashComponent implements OnInit {

  usersArr: Iuser[] = [];
  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.usersArr = this._userService.fetchAllUsers();


  }





}


