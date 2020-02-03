import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { fireconfig } from 'src/environments/firebase';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatCardModule} from '@angular/material';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeViewComponent } from './home/home-view/home-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    UserProfileComponent,
    NavbarComponent,
    HomeViewComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(fireconfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    NgxAuthFirebaseUIModule.forRoot(fireconfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    environment
  }
}
