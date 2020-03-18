import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'regions', loadChildren: () => import('./regions/regions.module').then(m => m.RegionsModule) },
  { path: 'user', loadChildren:() => import('./users/users.module').then(m=>m.UsersModule) },
  { path: 'auth', loadChildren:() => import('./auth/auth.module').then(m=>m.AuthModule)},
  { path: 'admin', loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
