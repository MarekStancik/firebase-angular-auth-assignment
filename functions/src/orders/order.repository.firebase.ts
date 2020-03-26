import { OrderRepository } from "./order.repository";

export class OrderRepositoryFirebase implements OrderRepository{
    addProduct(after: import("../products/shared/product.model").ProductModel) {
        throw new Error("Method not implemented.");
    }
    
}