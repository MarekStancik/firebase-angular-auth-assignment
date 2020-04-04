import { ProductModel } from "../products/shared/product.model";
import { OrderlineModel } from "../orders/shared/orderline.model";

export interface StockRepository{
    addProduct(prod: ProductModel,count: number) : Promise<any>;

    lowerStock(product: ProductModel, amount: number): Promise<void>;

    lowerStocks(orderLines: OrderlineModel[]): Promise<void>;

    updateName(uid: string, name: string):Promise<any>;
}