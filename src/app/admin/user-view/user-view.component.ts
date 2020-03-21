import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/users/shared/user.model';
import { UserService } from 'src/app/users/shared/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  user: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSelect(user: UserModel){
    this.user = user;
  }

  ban(user: UserModel){
    
  }

  unban(user: UserModel){

  }

  delete(user: UserModel){
    this.userService.deleteUser(user)
      .catch(err => alert(err.message));
  }
}
