import { StockRepository } from "./stock.repository";
import { ProductModel } from "../products/shared/product.model";
import admin = require("firebase-admin");

export class StockRepositoryFirebase implements StockRepository{

    updateName(uid: string, name: string): Promise<any> {
        return this.db()
        .doc(`${this.stockPath}/${uid}`)
        .set({name: name},{merge: true});
    }

    changeCount(after: ProductModel, arg1: number): Promise<any> {
        return this.db().doc(`${this.stockPath}/${after.uid}`).get()
            .then(ref => {
                const obj = ref.data();
                if(obj){
                    const cnt = obj.count + arg1;
                    return this.db().doc(`${this.stockPath}/${after.uid}`)
                        .set({count: cnt},{merge: true});
                }
                return Promise.reject();
            });
    }

    stockPath = "stocks"

    addProduct(prod: ProductModel,count: number): Promise<any> {
        return this.db().doc(`${this.stockPath}/${prod.uid}`).set({product: prod,count: count});
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
      }
    
}