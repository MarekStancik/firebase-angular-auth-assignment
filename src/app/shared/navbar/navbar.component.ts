import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { DialogUserLoginComponent } from 'src/app/users/dialog-user-login/dialog-user-login.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService,public dialog: MatDialog) { }

  ngOnInit() {
  }

  showLoginDialog(){
    const dialogRef = this.dialog.open(DialogUserLoginComponent, {
      width: '250px',
      data: {auth: this.auth}
    });  
  }

}
