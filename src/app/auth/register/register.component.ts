import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/users/user-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
        this._userService.updateUser(user);
        window.alert('Account has been created');
        this._router.navigate(['user/profile']);
      })
      .catch(error =>{ 
        console.error(error)
        window.alert(error.message);
      });
  }

}
