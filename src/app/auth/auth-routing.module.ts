import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserGuard } from '../guards/user.guard';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [!UserGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [!UserGuard]
  },
  {
    path: 'userMgmt',
    component: UserManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
