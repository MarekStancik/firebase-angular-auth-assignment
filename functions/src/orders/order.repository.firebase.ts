import { OrderRepository } from "./order.repository";
import { ProductModel } from "../products/shared/product.model";
import admin = require("firebase-admin");

export class OrderRepositoryFirebase implements OrderRepository{

    path = 'orders';

    updateName(uid: string, name: string): Promise<any> {
        return this.db()
        .doc(`${this.path}/${uid}`)
        .set({name: name},{merge: true});
    }
    
    addProduct(after:ProductModel) : Promise<any> {
        return this.db().collection(this.path).add(after);
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
      }
    
}