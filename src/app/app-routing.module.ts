import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/shared/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'regions', loadChildren: () => import('./regions/regions.module').then(m => m.RegionsModule) },
  { path: 'user', loadChildren:() => import('./users/users.module').then(m=>m.UsersModule) },
  { path: 'auth', loadChildren:() => import('./auth/auth.module').then(m=>m.AuthModule)},
  { path: 'products', loadChildren:() => import('./products/products.module').then(m=>m.ProductsModule)},
  { path: 'admin', loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule), canLoad: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
