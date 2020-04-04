import { OrderRepository } from "./order.repository";
import admin = require("firebase-admin");
import { OrderModel } from "./shared/order.model";

export class OrderRepositoryFirebase implements OrderRepository{
    addOrder(order: OrderModel): Promise<any> {
        throw new Error("Method not implemented.");
    }

    path = 'orders';

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
      }
    
}