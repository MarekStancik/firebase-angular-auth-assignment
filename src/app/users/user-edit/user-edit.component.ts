import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user-model';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserUpdatePassComponent } from '../user-update-pass/user-update-pass.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  showPass: boolean = false;

  user: UserModel;

  userForm = new FormGroup({
    displayName: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    photoURL: new FormControl(''),
    age: new FormControl(''),
    summary: new FormControl('')
  });

  constructor(public auth: AuthService,private _userService: UserService,public dialog: MatDialog) { 
      
    this.setUpUser(this.auth.getCurrentUser());
    auth.user$.subscribe(data => this.setUpUser(data));
  }

  ngOnInit() {
  }

  showPassDialog(){
    const dialogRef = this.dialog.open(UserUpdatePassComponent, {
      width: '250px',
      data: {auth: this.auth}
    });  
  }

  getNameError():string{
    let control = this.userForm.get('displayName');
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    return control.hasError('minlength') ? 'Minimum 4 characters' : '';
  }

  setUpUser(data: UserModel){
    if(data != null){
      this.user = data;

      let val = this.userForm.value;
      val.displayName = data.displayName;
      val.photoURL = data.photoURL;
      val.age = data.age;
      val.summary = data.summary;
  
      this.userForm.patchValue(val);
    }
  }
  
  save(){

    let val = this.userForm.value;   

    let updatedUser: UserModel = {
      email: this.user.email,
      uid: this.user.uid,
      age: val.age,
      displayName: val.displayName,
      photoURL: val.photoURL,
      summary: val.summary
    };

    if(this.userForm.invalid){
      this.userForm.markAsDirty();
      return;
    }

    

    this._userService.updateUser(updatedUser)
      .then(() => {
        alert('User info updated');
        this.user = updatedUser;
      })
      .catch((err) => {
        console.error(err);
        alert('Error occured updating user: ' + err.message);
      })

  }
}
