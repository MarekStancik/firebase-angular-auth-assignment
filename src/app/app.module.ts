import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared.module';
import { AuthService } from './auth/shared/auth.service';
import { UserService } from './users/shared/user.service';
import { DialogUserLoginComponent } from './auth/dialog-user-login/dialog-user-login.component';
import { UserGuard } from './users/shared/user.guard';
import { PublicModule } from './public/public.module';
import { NgxsModule } from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import { ProductState } from './products/shared/product.state';

@NgModule({
  declarations: [
    AppComponent,
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
    MatDialogModule,
    MatNativeDateModule,
    PublicModule,
    NgxsModule.forRoot([
        ProductState
      ], { 
        developmentMode: !environment.production 
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
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
