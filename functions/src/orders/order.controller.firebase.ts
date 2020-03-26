import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

export class OrderControllerFirebase implements OrderController{
    constructor(private OrderService: OrderService){
        
    }
}