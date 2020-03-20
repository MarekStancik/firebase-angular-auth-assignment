import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserUpdatePassComponent } from './user-update-pass/user-update-pass.component';


@NgModule({
  declarations: [UserProfileComponent, UserEditComponent,UserUpdatePassComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
