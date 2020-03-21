import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/shared/user.service';
import { Observable } from 'rxjs';
import { UserModel, UserRole } from 'src/app/users/shared/user.model';

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
    return ['admin','hunter','visitor'];
  }

  deleteUser(user: UserModel){
    this._userService.deleteUser(user);
  }

  setupBan(user: UserModel,checked: boolean){
  }
}
