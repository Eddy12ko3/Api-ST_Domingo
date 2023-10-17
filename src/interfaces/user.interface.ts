import { Auth } from "./auth.interface";

export interface User extends Auth{
    name: string;
    lastname: string;
    date_birth: Date;
    gender: string;
    document: string;
}