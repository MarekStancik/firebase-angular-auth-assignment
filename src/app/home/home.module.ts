import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { RegionsModule } from '../regions/regions.module';
import { HomeViewComponent } from './home-view/home-view.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [HomeViewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RegionsModule,
    SharedModule
  ]
})
export class HomeModule { }
