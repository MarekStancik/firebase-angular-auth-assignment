import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../user.service';
import { UserModel } from '../user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
    displayName: new FormControl(''),
    photoURL: new FormControl(''),
    age: new FormControl('')
  });


  constructor(private _userService: UserService,private _router: Router) { }

  ngOnInit() {
  }

  register(){
    const val = this.userForm.value;
    let user: UserModel = {
      email: val.email,
      uid: null,
      displayName: val.displayName,
      photoURL: val.photoURL,
      age: val.age
    };
    this._userService.createUser(user,val.password)
      .then(()=> {
        window.alert('Account has been created');
        this._router.navigate(['user/profile']);
      })
      .catch(error =>{ 
        console.error(error)
        window.alert(error.message);
      });
  }
}
