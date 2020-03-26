import { ProductModel } from "../products/shared/product.model";

export interface StockRepository{
    updateName(uid: string, name: string):Promise<any>;
    changeCount(after: ProductModel, arg1: number): Promise<any>;
    addProduct(prod: ProductModel,count: number) : Promise<any>;
}