import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take, map, tap } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase';
import { UserModel } from 'src/app/users/shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static readonly MIN_PASS_LENGTH = 8;

  user$: Observable<UserModel>;

  private _currentUser: UserModel = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.collection<UserModel>('users').doc(user.uid).valueChanges();
        }else{
          return of(null);
        }
      })
    );

    this.user$.subscribe(data => this._currentUser = data);
  }

  //*********Password handling*******//

  resetPassword(email: string){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  verifyPasswordResetCode(code: string){
    return this.afAuth.auth.verifyPasswordResetCode(code);
  }

  confirmPasswordReset(code: string, password: string){
    return this.afAuth.auth.confirmPasswordReset(code,password); 
  }

  changePassword(password: string): Promise<void>{
    return this.afAuth.auth.currentUser.updatePassword(password);
  }

  //***********Create***********//

  registerUser(email: string,pass: string):Promise<auth.UserCredential>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email,pass);
  }

  //Updates user data after creating profile
  private updateUserData(user){
    const userRef: AngularFirestoreDocument<UserModel>
      = this.afs.doc(`users/${user.uid}`);
    
    const data : UserModel = {
      uid: user.uid,
      email: user.email,
      roles: {
        visitor: true
      },
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, {merge: true});
  }

  //***********Login***********//


  getCurrentUser():UserModel{
    return this._currentUser;
  }

  reauthenticate(pass: string){
    var credential = firebase.auth.EmailAuthProvider.credential(this.getCurrentUser().email, pass);
    return this.afAuth.auth.currentUser.reauthenticateWithCredential(credential);
  }

  private oAuthLogin(provider): Promise<void>{
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  signIn(email: string, pass: string):Promise<auth.UserCredential>{
    return this.afAuth.auth.signInWithEmailAndPassword(email,pass);
  }

  signOut():Promise<void>{
    return this.afAuth.auth.signOut();
  }

  isLoggedIn(){
    return this._currentUser !== null;
  }

  //***********Authorization***********//

  canCheckIn(user: UserModel){
    const allowed = ['admin','hunter'];
    return this.checkAuthorization(user,allowed);
  }

  canDeleteRegion(user: UserModel){
    const allowed = ['admin'];
    return this.checkAuthorization(user,allowed);
  }

  canCreateRegion(user: UserModel){
    const allowed = ['admin'];
    return this.checkAuthorization(user,allowed);
  }

  isAdmin(user: UserModel){
    const allowed = ['admin'];
    return this.checkAuthorization(user,allowed);
  }

  private checkAuthorization(user: UserModel,allowedRoles: string[]): boolean{
    if(!user) return false;

    for(const role of allowedRoles){
      if(user.roles[role]){
        return true;
      }
    }
    return false;
  }
}
