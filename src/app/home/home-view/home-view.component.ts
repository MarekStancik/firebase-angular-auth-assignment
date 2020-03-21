import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  constructor(private as: AuthService) { }

  ngOnInit() {
  }

  isLogedIn(): boolean{
    return this.as.isLoggedIn();
  }

  getCheckInColor(): string{
    return 'accent';
  }

  getCheckOutColor(): string{
    return 'warn';
  }
}
