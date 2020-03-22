export interface UserModel {
    id: string;
    email: string;
    roles: UserRole;
    banned: boolean;
    displayName? :string;
    photoURL?: string;
    age?: number;
    summary?: string;
}

export interface UserRole{
    admin?: boolean;
    hunter?: boolean;
    visitor?: boolean;
}