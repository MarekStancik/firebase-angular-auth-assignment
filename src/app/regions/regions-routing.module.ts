import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionListComponent } from './region-list/region-list.component';


const routes: Routes = [
  {
    path: '',
    component: RegionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }
