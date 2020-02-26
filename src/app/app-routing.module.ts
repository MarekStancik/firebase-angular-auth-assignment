import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './home/home-view/home-view.component';


const routes: Routes = [
  { path: '', component: HomeViewComponent},
  { path: 'user', loadChildren: './users/users.module#UsersModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
