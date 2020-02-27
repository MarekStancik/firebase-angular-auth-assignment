import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserGuard } from '../guards/user.guard';
import { NegateUserLoginGuard } from '../guards/negate-user-login.guard';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NegateUserLoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NegateUserLoginGuard ]
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
