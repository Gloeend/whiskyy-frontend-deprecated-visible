import {Dispatch, SetStateAction} from "react";

export interface IAuthProvider {
    user?: IUser;
    setUser: Dispatch<SetStateAction<IUser>>;
    token?: string;
    setToken: Dispatch<SetStateAction<string | undefined>>;
    logout(): void;
}

export interface IUser {
    name: string;
    last_name: string;
    email: string;

    email_verified_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    country?: string;
    city?:string;
    postcode?:string;
}

export interface IUserCookie {
    user: IUser;
    token: string;
}