import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

export class ProductControllerFirebase implements ProductController{
    constructor(private ProductService: ProductService){
        
    }
}