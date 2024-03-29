import axios, {AxiosResponse} from "axios";
import {API_URL} from "@utils/api_url.ts";
import {IRefreshTokenResponse} from "@entities/auth_provider/_models.ts";

async function refreshToken(token: string) {
    return await axios.post(`${API_URL}/refresh`, {}, {
        headers: {
            Authorization: token && token.length === 0 ? undefined : `Bearer ${token}`
        }
    }).then(
        (r: AxiosResponse<IRefreshTokenResponse>) => {
            return r.data;
        }
    )
}


export {
    refreshToken
}