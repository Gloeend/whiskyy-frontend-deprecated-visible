import {IUser} from "@entities/auth_provider/AuthProvider.types.ts";

export interface IRefreshTokenResponse {
    access_token: string;
    expiredIn: 14400;
    type: string;
    user: IUser;
}