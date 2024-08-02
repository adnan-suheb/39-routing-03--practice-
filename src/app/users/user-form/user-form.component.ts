import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/users.interface';
import { CustomRegex } from 'src/app/shared/model/validationPattern';
import { UserService } from 'src/app/shared/service/user.service';
import { UuidService } from 'src/app/shared/service/uuid.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  ageArr: number[] = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
  isInEditMode: boolean = false;
  userRole!: string;
  userObj!: Iuser;
  userId!: string;

  constructor(
    private _routes: ActivatedRoute,
    private _userService: UserService,
    private _uuid: UuidService,
    private _router:Router
  ) { }

  ngOnInit(): void {

    this.createForm();
    this.manageUserIdParams();
    this.manageQueryParams();
  }

  createForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.username), Validators.minLength(6)]),
      personImg: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required),
      userDetails: new FormControl(null, [Validators.required, Validators.minLength(12)]),
      userGender: new FormControl(null, Validators.required),
      userAge: new FormControl(null, [Validators.required]),
      userEmail: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)]),
      userAddress: new FormControl(null, [Validators.required])


    })
  }

  get control() {
    return this.userForm.controls
  }



  manageUserIdParams() {
    this.userId = this._routes.snapshot.params['userId'];
    if (this.userId) {
      this.isInEditMode = true;
      this.userObj = this._userService.getSingleUserObj(this.userId);
      console.log(this.userObj);

      this.userForm.patchValue(this.userObj)
    }
    else {
      this.isInEditMode = false;
    }
  }

  manageQueryParams() {
    this.userRole = this._routes.snapshot.queryParams['userRole'];
    if (this.userRole === 'buyer') {
      this.userForm.disable();
    }
    else {
      this.userForm.enable();
    }
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      let newUser = { ...this.userForm.getRawValue(), userId: this._uuid.uuid() };
      this._userService.addUser(newUser)
    }
  }

  onUserUpdate() {
    let updatedObj = { ...this.userForm.getRawValue(), userId: this.userId };
    this._userService.updateUser(updatedObj)
  }

  onCancel(){
    this._router.navigate(['/users']);
  }
}


