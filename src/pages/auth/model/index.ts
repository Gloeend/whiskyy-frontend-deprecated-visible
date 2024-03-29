import {ILogin} from "@pages/auth/model/login.ts";
import {IRegistration} from "@pages/auth/model/registration.ts";
import {IUser} from "@entities/auth_provider/AuthProvider.types.ts";

export interface IAuthApiProvider {
    login(data: ILogin): Promise<IAuthApiWrapperResponse>;
    registration(data: IRegistration): Promise<IAuthApiWrapperResponse>;
}

export interface IAuthApiResponse {
    user: IUser;
    access_token: string;
}

export interface IAuthApiWrapperResponse {
    user: IUser;
    token: string;
}

export * from "./login.ts";
export * from "./registration.ts";