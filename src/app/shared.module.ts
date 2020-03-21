import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatSelectModule, MatInputModule, MatProgressSpinnerModule, MatCheckboxModule, MatIconModule,  } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule
  ]
})
export class SharedModule { 
  static forRoot(){
    return{
      ngModule: SharedModule,
      providers: []
    }
  }
}
