import { ProductRepository } from "./product.repository";
import { ProductModel } from "./shared/product.model";
import { StockRepository } from "../stocks/stock.repository";
import { OrderRepository } from "../orders/order.repository";

export class ProductService{

    constructor(private productRepo: ProductRepository,private stockRepo: StockRepository,private orderRepo: OrderRepository){      
        
    }

    async productCreated(prod: ProductModel) : Promise<any>{
        if(prod === null || prod === undefined)
            return Promise.reject("Provided product is not of type ProductModel");
            console.log(this.productRepo);

        await this.stockRepo.addProduct(prod,5);
        return Promise.resolve(prod);
    }

    async productUpdated(id: any, before: ProductModel, after: ProductModel): Promise<any> {
        if(before.name !== after.name){ //Update everywhere
            await this.orderRepo.updateName(after.uid,after.name)
            await this.stockRepo.updateName(after.uid,after.name)
        }
        
        return Promise.resolve();
    }
}