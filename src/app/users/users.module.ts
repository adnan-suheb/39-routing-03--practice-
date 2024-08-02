import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashComponent } from './user-dash/user-dash.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { MaterialModule } from '../material/material.module';
import { RoutingModule } from '../routing/routing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserDashComponent,
    UserFormComponent,
    SingleUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RoutingModule,
    ReactiveFormsModule
  ],
  exports: [UserDashComponent]
})
export class UsersModule { }
