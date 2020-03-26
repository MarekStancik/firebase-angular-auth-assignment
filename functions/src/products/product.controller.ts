import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { EventContext, Change } from "firebase-functions";

export interface ProductController{
    onCreated(snap: DocumentSnapshot,context: EventContext): Promise<any>;
    onUpdated(change: Change<DocumentSnapshot>,context: EventContext): Promise<any>;
}