import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { DialogUserLoginComponent } from '../dialog-user-login/dialog-user-login.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;

  password: string;

  error: string;
  constructor(private _auth: AuthService,private _router: Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.showLoginDialog();
  }

  showLoginDialog(){
    const dialogRef = this.dialog.open(DialogUserLoginComponent, {
      width: '250px',
      data: {auth: this._auth, router: this._router}
    });  

    
    dialogRef.afterClosed().subscribe(() =>{ 
      if(!dialogRef.componentInstance.isSignedIn)
        this._router.navigate(['/'])
    });
  }
}
