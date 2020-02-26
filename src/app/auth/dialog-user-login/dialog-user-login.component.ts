import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogLoginData{
  auth: AuthService;
  router: Router;
}

@Component({
  selector: 'app-dialog-user-login',
  templateUrl: './dialog-user-login.component.html',
  styleUrls: ['./dialog-user-login.component.scss']
})
export class DialogUserLoginComponent implements OnInit {

  isSignedIn = false;

  email: string;

  password: string;

  error: string;
  constructor(public dialogRef: MatDialogRef<DialogUserLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogLoginData) { }

  ngOnInit() {
  }

  closeSuccess(){
    this.isSignedIn = true;
    this.dialogRef.close(); 
    this.data.router.navigate(['/user/profile'])
  }

  signIn(){
    this.data.auth.signIn(this.email,this.password)
      .then(() => {
        this.closeSuccess();
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  googleSignIn(){
    this.data.auth.googleSignin()
      .then(() => {
        this.closeSuccess();
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  resetPassword(){
    if (!this.email) { 
      alert('Type in your email first'); 
      return;
    }
    this.data.auth.resetPassword(this.email) 
    .then(
      () => alert('A password reset link has been sent to your email address'), 
      (rejectionReason) => alert(rejectionReason)) 
    .catch(e => alert('An error occurred while attempting to reset your password'));
  }

}
