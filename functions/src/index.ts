import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DependencyFactory } from './depencency-factory';

admin.initializeApp();

const difa: DependencyFactory = new DependencyFactory();

//In case user is deleted from users collection
//This method ensures that he is also deleted from auth
exports.deleteUser = functions.firestore.document('users/{id}').onDelete((res, context) => {
        return difa.getUserController().deletedUser(res,context);
    });

//Block user implementation
exports.banUser = functions.firestore.document('users/{id}')
    .onUpdate((change,context) => {
        return difa.getUserController().userUpdated(change,context);
    });


exports.productCreated = functions.firestore.document('products/{id}')
    .onCreate((snap,ctx) => {
        
    });
