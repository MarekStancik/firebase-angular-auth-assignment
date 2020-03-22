import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  deleteUser(user: UserModel):Promise<void> {
    if(this._auth.isAdmin(this._auth.getCurrentUser()))
      return this.afs.collection('users').doc(user.id).delete();
    
    return new Promise<any>((reject) => reject({message: 'you are not authorized to do this action'}));
      //Deleting from auth is taken care by firebase function
  }

  constructor(private _auth: AuthService,private afs: AngularFirestore) { 
  }

  createUser(user: UserModel,pass: string):Promise<UserModel>{
    return new Promise((resolve,reject) => {
      this._auth.registerUser(user.email,pass)
      .then(data =>{
        user.id = data.user.uid;
        this.updateUser(user)
          .then(() => resolve(user))
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
    });
  }

  updateUser(user: UserModel):Promise<void>{
    return this.afs.collection('users').doc(user.id).set(user);
  }

  getAllUsers():Observable<any[]>{
    return this.afs.collection('users').valueChanges();
  }

  setBan(user: UserModel,ban: boolean){
    if(this._auth.isAdmin(this._auth.getCurrentUser())){
      user.banned = ban;
      this.updateUser(user);
    }
  }
}
