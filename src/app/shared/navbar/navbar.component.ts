import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { DialogUserLoginComponent } from 'src/app/auth/dialog-user-login/dialog-user-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService,private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
  }

  showLoginDialog(){
    const dialogRef = this.dialog.open(DialogUserLoginComponent, {
      width: '250px',
      data: {auth: this.auth, router: this.router}
    });  
  }

}
