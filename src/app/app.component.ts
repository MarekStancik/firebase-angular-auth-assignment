import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-first-assignment';

  constructor(public auth: AuthService) {

  }

  printUser(event) {
    console.log(event);
  }

  printError(event) {
      console.error(event);
  }
}
