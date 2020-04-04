import { StockRepository } from "./stock.repository";
import { ProductModel } from "../products/shared/product.model";
import admin = require("firebase-admin");
import { OrderlineModel } from "../orders/shared/orderline.model";

export class StockRepositoryFirebase implements StockRepository{
    
    lowerStock(product: ProductModel, amount: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    lowerStocks(orderLines: OrderlineModel[]): Promise<void> {
        throw new Error("Method not implemented.");
    }


    stockPath = "stocks"

    addProduct(prod: ProductModel,count: number): Promise<any> {
        return this.db().doc(`${this.stockPath}/${prod.uid}`).set({product: prod,count: count});
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
      }
    
}