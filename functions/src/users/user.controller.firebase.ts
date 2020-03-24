import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export class UserControllerFirebase implements UserController{
    constructor(private UserService: UserService){}
}