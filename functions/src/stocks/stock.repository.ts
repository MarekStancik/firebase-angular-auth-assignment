import { ProductModel } from "../products/shared/product.model";

export interface StockRepository{
    changeCount(after: ProductModel, arg1: number): Promise<any>;
    addProduct(prod: ProductModel,count: number) : Promise<any>;
}