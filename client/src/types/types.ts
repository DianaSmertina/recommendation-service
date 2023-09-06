export interface IUser {
    id: number;
    email: string;
    isAdmin: boolean;
    name?: string;
    password?: string;
}