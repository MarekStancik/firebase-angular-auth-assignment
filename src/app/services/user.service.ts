import { Injectable } from '@angular/core';
import { UserModel } from '../users/user-model';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  async deleteUser(user: UserModel) {
    //it is imposible to delete him from auth without him logging in
    return this.afs.collection('users').doc(user.uid).delete();
  }

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

  getAllUsers():Observable<any[]>{
    return this.afs.collection('users').valueChanges();
  }
}
