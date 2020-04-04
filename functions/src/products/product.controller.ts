import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { EventContext } from "firebase-functions";

export interface ProductController{
    onCreated(snap: DocumentSnapshot,context: EventContext): Promise<any>;
}