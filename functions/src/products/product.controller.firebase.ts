import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { EventContext, Change } from "firebase-functions";
import { ProductModel } from "./shared/product.model";

export class ProductControllerFirebase implements ProductController{
    constructor(private productService: ProductService){
        
    }

    onUpdated(change: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
        const before: ProductModel = change.before.data() as ProductModel;
        const after: ProductModel = change.after.data() as ProductModel;
        return this.productService.productUpdated(context.params.id,before,after);
    }

    onCreated(snap: DocumentSnapshot, context: EventContext): Promise<any> {
        const prod: ProductModel = snap.data() as ProductModel;
        if(prod !== undefined){
            return this.productService.productCreated(prod);
        }
        return Promise.reject("Product undefined");
    }
}