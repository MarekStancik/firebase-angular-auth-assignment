import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserGuard } from './shared/user.guard';


const routes: Routes = [
  {
    path:'profile',
    component: UserProfileComponent, canActivate: [UserGuard]
  },
  {
    path:'profile/edit',
    component: UserEditComponent, canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
