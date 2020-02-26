import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user-model';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: UserModel;

  userForm = new FormGroup({
    password: new FormControl(''),
    displayName: new FormControl(''),
    photoURL: new FormControl(''),
    age: new FormControl('')
  });

  constructor(public auth: AuthService,private _userService: UserService) { 
      
    this.setUpUser(this.auth.user);
    auth.user$.subscribe(data => this.setUpUser(data));
  }

  ngOnInit() {
  }

  setUpUser(data: UserModel){
    this.user = data;

    let val = this.userForm.value;
    val.displayName = data.displayName;
    val.photoURL = data.photoURL;
    val.age = data.age;

    this.userForm.patchValue(val);
  }

  save(){

    let val = this.userForm.value;

    let updatedUser: UserModel = {
      email: this.user.email,
      uid: this.user.uid,
      age: val.age,
      displayName: val.displayName,
      photoURL: val.photoURL
    };

    this._userService.updateUser(updatedUser)
      .then(() => {
        alert('User info updated');
      })
      .catch((err) => {
        console.error(err);
        alert('Error occured updating user: ' + err.message);
      })

  }
}
