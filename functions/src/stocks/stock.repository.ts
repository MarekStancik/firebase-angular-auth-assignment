import { ProductModel } from "../products/shared/product.model";

export interface StockRepository{
    addProduct(prod: ProductModel,count: number) : Promise<any>;

    getCountOf(prod: ProductModel) : Promise<number>;
}