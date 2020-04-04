import { OrderRepository } from "./order.repository";
import admin = require("firebase-admin");
import { OrderModel } from "./shared/order.model";

export class OrderRepositoryFirebase implements OrderRepository{

    path = 'orders';

    addOrder(order: OrderModel): Promise<any> {
        return this.db().doc(order.id).set(order);
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
      }
    
}