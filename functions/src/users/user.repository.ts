import { UserModel } from "./shared/user.model";

export interface UserRepository{
    deleteUser(id: string) : Promise<any>;
    setUserBan(user: UserModel) : Promise<any>;
    updateUser(user: UserModel) : Promise<void>;
}