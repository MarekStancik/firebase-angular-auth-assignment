import { UserRepository } from "./user.repository";

export class UserService{
    constructor(private repo: UserRepository){}
}