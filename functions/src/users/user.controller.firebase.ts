import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Change, EventContext } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { UserModel } from "./shared/user.model";

export class UserControllerFirebase implements UserController{
    constructor(private userService: UserService){}

    userUpdated(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const id = context.params.id;
        const before = snap.before.data() as UserModel;
        const after = snap.after.data() as UserModel;
    
        return this.userService.updateUser(id,before,after);
    }

    deletedUser(res: DocumentSnapshot, context: EventContext): Promise<void> {
        const id = context.params.id;
        return this.userService.deleteUser(id);
    }
}