import { ProductRepository } from "./product.repository";
import { ProductModel } from "./shared/product.model";
import { StockRepository } from "../stocks/stock.repository";

export class ProductService{

    constructor(private productRepo: ProductRepository,private stockRepo: StockRepository){      
        
    }

    async productCreated(prod: ProductModel) : Promise<any>{
        if(prod === null || prod === undefined)
            return Promise.reject("Provided product is not of type ProductModel");
            console.log(this.productRepo);

        await this.stockRepo.addProduct(prod,5);
        return Promise.resolve(prod);
    }
}