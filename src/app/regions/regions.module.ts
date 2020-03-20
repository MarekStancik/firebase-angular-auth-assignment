import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionsRoutingModule } from './regions-routing.module';
import { RegionListComponent } from './region-list/region-list.component';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatDatepickerModule } from '@angular/material';
import { SharedModule } from '../shared.module';
import { RegionFormComponent } from './region-form/region-form.component';


@NgModule({
  declarations: [RegionListComponent, RegionFormComponent],
  imports: [
    CommonModule,
    RegionsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    SharedModule
  ],
  exports:[RegionListComponent,RegionFormComponent]
})
export class RegionsModule { }
