import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MatListModule } from '@angular/material';
import { SharedModule } from '../shared.module';
import { RegionsViewComponent } from './regions-view/regions-view.component';
import { RegionsModule } from '../regions/regions.module';


@NgModule({
  declarations: [UsersListComponent, RegionsViewComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatListModule,
    SharedModule,
    RegionsModule
  ]
})
export class AdminModule { }
