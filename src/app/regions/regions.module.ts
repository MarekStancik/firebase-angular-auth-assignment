import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionsRoutingModule } from './regions-routing.module';
import { RegionListComponent } from './region-list/region-list.component';
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RegionListComponent],
  imports: [
    CommonModule,
    RegionsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule
  ],
  exports:[RegionListComponent]
})
export class RegionsModule { }
