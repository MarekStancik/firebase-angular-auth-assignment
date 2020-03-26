import { ProductModel } from "../products/shared/product.model";

export interface OrderRepository{
    updateName(uid: string, name: string): Promise<any>;
    addProduct(after: ProductModel): Promise<any>;

}