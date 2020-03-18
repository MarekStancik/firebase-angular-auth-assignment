import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserModel } from '../shared/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: UserModel;

  constructor(public auth: AuthService) { 
      
    this.user = this.auth.getCurrentUser();
    auth.user$.subscribe(data => this.user = data);
  }

  ngOnInit() {
  }

}
