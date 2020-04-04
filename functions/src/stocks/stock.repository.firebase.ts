import { StockRepository } from "./stock.repository";
import { ProductModel } from "../products/shared/product.model";
import admin = require("firebase-admin");
import DocumentReference = admin.firestore.DocumentReference;
import DocumentData = admin.firestore.DocumentData;
import { OrderlineModel } from "../orders/shared/orderline.model";
import { StockModel } from "./shared/stock.model";

export class StockRepositoryFirebase implements StockRepository{
    stockPath = "stocks";

    async lowerStock(product: ProductModel, amount: number): Promise<void> {
        const doc =  await this.db().collection(`${this.stockPath}`)
            .doc(`${product.uid}`)
            .get();
        const stock = doc.data() as StockModel;
        stock.count = stock.count - amount;
        await this.db().doc(`${this.stockPath}/${product.uid}`).set(stock);
        return Promise.resolve();
    }

    async lowerStocks(orderLines: OrderlineModel[]): Promise<void> {

        const batch = this.db().batch();
        const docs = new Map<string,OrderlineModel>();
        const docsArr: DocumentReference<DocumentData>[] = [];
        orderLines.forEach(ol =>{
            const ref = this.db().collection(`${this.stockPath}`).doc(`${ol.product.uid}`);
            docs.set(ol.product.uid,ol);
            docsArr.push(ref);
        });

        const stocks = await this.db().getAll(...docsArr.values());
        stocks.forEach(snap => {
            const stock = snap.data() as StockModel;
            const ol = docs.get(snap.id);
            if(ol !== undefined){
                if(ol.product.uid === snap.id) 
                    stock.count = stock.count - ol.amount;
            }
            batch.set(this.db().collection(`${this.stockPath}`).doc(`${snap.id}`), stock);
        });
        await batch.commit();

        return Promise.resolve();
    }

    addProduct(prod: ProductModel,count: number): Promise<any> {
        return this.db()
        .doc(`${this.stockPath}/${prod.uid}`)
        .set({product: prod,count: count});
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
      }
    
}