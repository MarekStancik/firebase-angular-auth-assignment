import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {OrderModel} from './shared/order.model';

export interface OrderController {
  addOrder(snap: DocumentSnapshot, context: EventContext): Promise<OrderModel>;
}