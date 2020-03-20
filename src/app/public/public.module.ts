import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component'; 
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    SharedModule,
    CommonModule,
    MatToolbarModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class PublicModule { }
