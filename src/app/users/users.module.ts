import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserUpdatePassComponent } from './user-update-pass/user-update-pass.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';


@NgModule({
  declarations: [UserProfileComponent, UserEditComponent,UserUpdatePassComponent, UserListComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [UserListComponent]
})
export class UsersModule { }
