import { OrderController } from "./order.controller";
import { EventContext } from "firebase-functions";
import { OrderModel } from "./shared/order.model";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { OrderService } from "./order.service";

export class OrderControllerFirebase implements OrderController{
    constructor(private orderService: OrderService) {}

    addOrder(snap: DocumentSnapshot, context: EventContext): Promise<OrderModel> {
      const order = snap.data() as OrderModel;
      order.id = context.params.orderId;
      return this.orderService.addOrder(order);
    }
}