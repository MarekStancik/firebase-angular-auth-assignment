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
import { MatToolbarModule } from '@angular/material';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeViewComponent } from './home/home-view/home-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DialogUserLoginComponent } from './auth/dialog-user-login/dialog-user-login.component';
import { UserGuard } from './guards/user.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeViewComponent,
    DialogUserLoginComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(fireconfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgxAuthFirebaseUIModule.forRoot(fireconfig),
    SharedModule.forRoot()
  ],
  entryComponents: [
    DialogUserLoginComponent
  ],
  providers: [AuthService,UserService,UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    environment
  }
}
