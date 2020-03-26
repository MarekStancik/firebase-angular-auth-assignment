import { StockRepository } from "./stock.repository";
import { ProductModel } from "../products/shared/product.model";

export class StockRepositoryFirebase implements StockRepository{
    getCountOf(prod: ProductModel): Promise<number> {
        throw new Error("Method not implemented.");
    }
    addProduct(prod: ProductModel,count: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}