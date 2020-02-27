import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MatListModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatListModule,
    SharedModule
  ]
})
export class AdminModule { }
