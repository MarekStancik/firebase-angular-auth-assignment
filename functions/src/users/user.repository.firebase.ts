import { UserRepository } from "./user.repository";
import * as admin from 'firebase-admin';
import { UserModel } from "./shared/user.model";

export class UserRepositoryFirebase implements UserRepository{
    setUserBan(user: UserModel): Promise<any> {
        return admin.auth().updateUser(user.id,{disabled: user.banned});
    }
    updateUser(user: UserModel): Promise<void> {
        return new Promise((resolve,reject) => {resolve()});
    }
    deleteUser(id: string): Promise<any> {
        return admin.auth().deleteUser(id);
    }
}