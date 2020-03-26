import { ProductRepository } from "./product.repository";
import { ProductModel } from "./shared/product.model";
import { StockRepository } from "../stocks/stock.repository";
import { OrderRepository } from "../orders/order.repository";

export class ProductService{
    productUpdated(id: any, before: ProductModel, after: ProductModel): Promise<any> {
        this.stockRepo.changeCount(after,after.timesPurchased - before.timesPurchased);
        if(before.timesPurchased < after.timesPurchased){ //bought
            return this.orderRepo.addProduct(after);
        }  
        else if(before.name != after.name){
            return Promise.resolve();
        }
        else
            return Promise.resolve();
    }

    constructor(private productRepo: ProductRepository,private stockRepo: StockRepository,private orderRepo: OrderRepository){      
        
    }

    productCreated(prod: ProductModel) : Promise<any>{
        if(prod === null || prod === undefined)
            return Promise.reject("Provided product is not of type ProductModel");
            console.log(this.productRepo);

        this.stockRepo.addProduct(prod,5);
        return Promise.resolve(prod);
    }
}