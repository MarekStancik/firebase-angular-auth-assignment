import { Injectable } from '@angular/core';
import { UserModel } from './user-model';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _auth: AuthService,private afs: AngularFirestore) { 
  }

  createUser(user: UserModel,pass: string):Promise<UserModel>{
    return new Promise((resolve,reject) => {
      this._auth.createUser(user.email,pass)
      .then(data =>{
        user.uid = data.user.uid;
        this.updateUser(user)
          .then(() => resolve(user))
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
    });
  }

  updateUser(user: UserModel):Promise<void>{
    return this.afs.collection('users').doc(user.uid).set(user);
  }
}
