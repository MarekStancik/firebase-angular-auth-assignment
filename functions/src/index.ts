import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

//In case user is deleted from users collection
//This method ensures that he is also deleted from auth
exports.deleteUser = functions.firestore.document('users/{id}')
    .onDelete((res, context) => {
        admin.auth().deleteUser(context.params.id)
        .then(() => console.log('delete user'))
        .catch(err => console.error(err))
    });

//Block user implementation
exports.banUser = functions.firestore.document('users/{id}')
    .onUpdate((change,context) => {
        const id = context.params.id;

        const before = change.before.data();
        const after = change.after.data();

        const hasChangedBan = (before != undefined && after != undefined && before.banned != after.banned)
            || (after != undefined && before == undefined);
        if(hasChangedBan){
            admin.auth().getUser(id)
            .then( userRecord => {
                admin.auth().updateUser(id,{disabled: context.params.banned})
                    .catch(() => console.log('Could not enable/disable user'));
            })
            .catch(()=> console.log('Couldnt retrieve user'));
        }
        
    });

