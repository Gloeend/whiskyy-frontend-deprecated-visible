import {createContext, FC, PropsWithChildren, useContext} from "react";
import {useApi} from "@entities/api_provider/ApiProvider.tsx";
import {AxiosResponse} from "axios";
import {
    IAuthApiProvider,
    IAuthApiResponse, IAuthApiWrapperResponse,
    ILogin,
    IRegistration
} from "@pages/auth/model";
import {API_URL} from "@utils/api_url.ts";

const initialValue = {} as IAuthApiProvider;
const Context = createContext<IAuthApiProvider>(initialValue);
export const useAuthApi = () => useContext<IAuthApiProvider>(Context);

export const AuthApiProvider: FC<PropsWithChildren> = ({children}) => {
    const {api} = useApi();

    async function login(data: ILogin): Promise<IAuthApiWrapperResponse> {
        return await api.post(`login`, data).then(
            (r: AxiosResponse<IAuthApiResponse>): IAuthApiWrapperResponse => {return {user: r.data.user, token: r.data.access_token}}
        )
    }
    async function registration(data: IRegistration): Promise<IAuthApiWrapperResponse> {
        return await api.post(`${API_URL}/registration`, data).then(
            (r: AxiosResponse<IAuthApiResponse>): IAuthApiWrapperResponse => {return {user: r.data.user, token: r.data.access_token}}
        )
    }


    return <Context.Provider value={{
        login,
        registration
    }}>{children}</Context.Provider>
}