import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { EventContext } from "firebase-functions";
import { ProductModel } from "./shared/product.model";

export class ProductControllerFirebase implements ProductController{
    constructor(private productService: ProductService){
        
    }

    onCreated(snap: DocumentSnapshot, context: EventContext): Promise<any> {
        const prod: ProductModel = snap.data() as ProductModel;
        if(prod !== undefined){
            return this.productService.productCreated(prod);
        }
        return Promise.reject("Product undefined");
    }
}