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

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<UserModel>(`users/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    );
  }

  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  async signOut(){
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
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
