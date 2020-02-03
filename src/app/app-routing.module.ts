import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { AuthGuard } from './services/auth.guard';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { HomeViewComponent } from './home/home-view/home-view.component';


const routes: Routes = [
  { path: '', component: HomeViewComponent},
  { path: 'details', component: UserDetailsComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
