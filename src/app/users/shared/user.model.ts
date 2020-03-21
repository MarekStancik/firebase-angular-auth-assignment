export interface UserModel {
    uid: string;
    email: string;
    roles: UserRole;
    displayName? :string;
    photoURL?: string;
    age?: number;
    summary?: string;
    banned?: boolean;
}

export interface UserRole{
    admin?: boolean;
    hunter?: boolean;
    visitor?: boolean;
}