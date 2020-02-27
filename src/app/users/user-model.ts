export interface UserModel {
    uid: string;
    email: string;
    displayName? :string;
    photoURL?: string;
    age?: number;
    summary?: string;
    role?: UserRole;
    banned?: boolean;
}

export enum UserRole{
    Admin = "admin",
    User = "user",
    Manager = "manager"
}