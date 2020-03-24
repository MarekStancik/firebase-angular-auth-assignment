import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DependencyFactory } from './depencency-factory';

admin.initializeApp();

const difa: DependencyFactory = new DependencyFactory();

//In case user is deleted from users collection
//This method ensures that he is also deleted from auth
exports.deleteUser = functions.firestore.document('users/{id}').onDelete((res, context) => {
        return admin.auth().deleteUser(context.params.id);
    });

//Block user implementation
exports.banUser = functions.firestore.document('users/{id}')
    .onUpdate((change,context) => {

        return new Promise((resolve,reject) =>{
            const id = context.params.id;
            const prod = change.after.data() as any;
     
            admin.auth().getUser(id)
            .then( userRecord => {
             if(userRecord.disabled != prod.banned)
                admin.auth().updateUser(id,{disabled: prod.banned})
                    .then(() => resolve('User ban updated'))
                    .catch(err => reject(err));
            else
                resolve();
            })
            .catch(()=> reject('Couldnt retrieve user'));
        })
    });

