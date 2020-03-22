import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionsViewComponent } from './regions-view/regions-view.component';
import { UserViewComponent } from './user-view/user-view.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'regions',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserViewComponent
  },
  {
    path: 'regions',
    component: RegionsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
