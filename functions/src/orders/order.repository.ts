import { OrderModel } from "./shared/order.model";

export interface OrderRepository{
    addOrder(order: OrderModel): Promise<any>;
}