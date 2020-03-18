import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatDialogModule } from '@angular/material';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './auth/shared/auth.service';
import { UserService } from './users/shared/user.service';
import { DialogUserLoginComponent } from './auth/dialog-user-login/dialog-user-login.component';
import { UserGuard } from './users/shared/user.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DialogUserLoginComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
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
