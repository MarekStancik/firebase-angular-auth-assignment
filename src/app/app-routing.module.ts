import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/shared/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'user', loadChildren:() => import('./users/users.module').then(m=>m.UsersModule) },
  { path: 'auth', loadChildren:() => import('./auth/auth.module').then(m=>m.AuthModule)},
  { path: 'products', loadChildren:() => import('./products/products.module').then(m=>m.ProductsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
