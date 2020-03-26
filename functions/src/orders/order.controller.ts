import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { EventContext, Change } from "firebase-functions";

export interface OrderController{
    written(change: Change<DocumentSnapshot>, ctx: EventContext): Promise<any>;
}