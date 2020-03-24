import { UserRepository } from "./user.repository";
import { UserModel } from "./shared/user.model";

export class UserService{
    constructor(private repo: UserRepository){}

    deleteUser(id: string):Promise<any>{
        return this.repo.deleteUser(id);
    }

    updateUser(id: string,before: UserModel, after : UserModel) : Promise<void>{
        if(before && before.banned !== after.banned){
            after.id = id;
            return this.repo.setUserBan(after);
        }
        else
            return this.repo.updateUser(after);
    }
}