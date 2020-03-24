import { Change, EventContext } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

export interface UserController{
    deletedUser(snap: DocumentSnapshot, context: EventContext) : Promise<void>;

    userUpdated(res: Change<DocumentSnapshot>, context: EventContext) : Promise<void>;
}