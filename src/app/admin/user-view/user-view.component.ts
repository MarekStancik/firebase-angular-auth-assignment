import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/users/shared/user.model';
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
      .catch(err => alert(err.message));
  }
}
