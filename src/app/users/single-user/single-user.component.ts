import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/users.interface';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  userObj!: Iuser;
  userId!: string;
  constructor(
    private _userService: UserService,
    private _routes: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._routes.params.subscribe(res => {
      if (res) {
        this.userId = this._routes.snapshot.params['userId'];
        this.userObj = this._userService.getSingleUserObj(this.userId);
      }
    })

  }

  goToEditUser() {
    this._router.navigate(['editUser'], {
      relativeTo: this._routes,
      queryParamsHandling: 'preserve'
    })
  }

  onRemove() {
    this._userService.onRemove(this.userId);
  }
}

