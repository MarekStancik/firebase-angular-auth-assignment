import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

export class OrderControllerFirebase implements OrderController{
    constructor(private orderService: OrderService){
        
    }
    
    written(change: import("firebase-functions").Change<import("firebase-functions/lib/providers/firestore").DocumentSnapshot>, ctx: import("firebase-functions").EventContext): Promise<any> {
        throw new Error("Method not implemented.");
    }
}