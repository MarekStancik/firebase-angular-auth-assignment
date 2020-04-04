import { ProductModel } from "../../products/shared/product.model";

export interface StockModel {
    count: number,
    product: ProductModel;
}