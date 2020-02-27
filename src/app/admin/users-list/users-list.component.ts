import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { UserModel, UserRole } from 'src/app/users/user-model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {

  users: Observable<UserModel[]>;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.users = this._userService.getAllUsers();
  }

  getRoles(){
    return Object.keys(UserRole);
  }

  deleteUser(user: UserModel){
    this._userService.deleteUser(user);
  }

  setupBan(user: UserModel,checked: boolean){
  }
}
