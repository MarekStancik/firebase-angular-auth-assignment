import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { RegionsViewComponent } from './regions-view/regions-view.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'regions',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersListComponent
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
