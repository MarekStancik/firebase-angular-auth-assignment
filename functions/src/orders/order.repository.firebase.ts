import { OrderRepository } from "./order.repository";
import admin = require("firebase-admin");
import { OrderModel } from "./shared/order.model";

export class OrderRepositoryFirebase implements OrderRepository{

    path = 'orders';

    updateName(uid: string, name: string): Promise<any> {
        return this.db()
        .doc(`${this.path}/${uid}`)
        .set({name: name},{merge: true});
    }

    addOrder(order: OrderModel): Promise<any> {
        return this.db().doc(order.id).set(order);
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
      }
    
}