import { ProductModel } from "../../products/shared/product.model";

export interface OrderlineModel {
    id: string;
    product: ProductModel;
    amount: number;
}