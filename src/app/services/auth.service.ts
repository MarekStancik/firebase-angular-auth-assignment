import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { UserModel } from '../users/user-model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>;

  user: UserModel;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.collection('users').doc(user.uid).valueChanges();
        }else{
          return of(null);
        }
      })
    );

    this.user$.subscribe(data => this.user = data);
  }

  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  signIn(email: string, pass: string):Promise<auth.UserCredential>{
    return this.afAuth.auth.signInWithEmailAndPassword(email,pass);
  }

  signOut():Promise<void>{
    return this.afAuth.auth.signOut();
  }

  createUser(email: string,pass: string):Promise<auth.UserCredential>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email,pass);
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<UserModel>
      = this.afs.doc(`users/${user.uid}`);
    
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, {merge: true});
  }
}
