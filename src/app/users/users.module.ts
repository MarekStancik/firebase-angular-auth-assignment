import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { SharedModule } from '../shared/shared.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserUpdatePassComponent } from './user-update-pass/user-update-pass.component';
import { DialogUserLoginComponent } from './dialog-user-login/dialog-user-login.component';


@NgModule({
  declarations: [UserProfileComponent, UserRegisterComponent, UserEditComponent,UserUpdatePassComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
