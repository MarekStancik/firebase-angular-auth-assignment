import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MatListModule } from '@angular/material';
import { SharedModule } from '../shared.module';
import { RegionsViewComponent } from './regions-view/regions-view.component';
import { RegionsModule } from '../regions/regions.module';
import { UsersModule } from '../users/users.module';
import { UserViewComponent } from './user-view/user-view.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [UserViewComponent, RegionsViewComponent, UserViewComponent, NavComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatListModule,
    SharedModule,
    RegionsModule,
    UsersModule
  ]
})
export class AdminModule { }
