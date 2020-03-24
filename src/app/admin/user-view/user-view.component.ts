import { Component, OnInit } from '@angular/core';
import { UserModel, UserRole } from 'src/app/users/shared/user.model';
import { UserService } from 'src/app/users/shared/user.service';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  user: UserModel;

  constructor(private userService: UserService,private auth: AuthService) { }

  ngOnInit() {
  }

  onSelect(user: UserModel){
    this.user = user;
  }

  ban(user: UserModel){
    this.userService.setBan(user,true);
  }

  unban(user: UserModel){
    this.userService.setBan(user,false);
  }

  resetPassword(user: UserModel){
    this.auth.resetPassword(user.email);
  }

  delete(user: UserModel){
    this.userService.deleteUser(user)
      .then(() => this.user = null)
      .catch(err => alert(err.message));
  }

  updateRole(role : string){
    //To deny admin removing himself as admin
    if(this.auth.isAdmin(this.user) && this.user === this.auth.getCurrentUser())
      return;
    
    console.log(role);
    
    this.user.roles = { };
    this.user.roles[role] = true;

    this.userService.updateUser(this.user);
  }

  getRoleForUser(user: UserModel): string{
    for(const role of this.getRoles()){
      if(user.roles[role] == true)
        return role;
    }
    return '';
  }

  getRoles():string[]{
    return ['admin','hunter','visitor'];
  }
}
