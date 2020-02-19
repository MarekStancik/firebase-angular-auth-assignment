import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogLoginData{
  auth: AuthService;
}

@Component({
  selector: 'app-dialog-user-login',
  templateUrl: './dialog-user-login.component.html',
  styleUrls: ['./dialog-user-login.component.scss']
})
export class DialogUserLoginComponent implements OnInit {

  email: string;

  password: string;

  error: string;
  constructor(public dialogRef: MatDialogRef<DialogUserLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogLoginData) { }

  ngOnInit() {
  }

  signIn(){
    this.data.auth.signIn(this.email,this.password)
      .then(() => this.dialogRef.close())
      .catch(err => {
        this.error = err.message;
      });
  }

  googleSignIn(){
    this.data.auth.googleSignin()
      .then(() => this.dialogRef.close())
      .catch(err => {
        this.error = err.message;
      });
  }

}
