import axios, {AxiosAdapter} from "axios";
import {API_URL} from "@utils/api_url.ts";
import {createContext, FC, PropsWithChildren, useContext, useEffect} from "react";
import {IApiProvider} from "@entities/api_provider/_models.ts";
import {refreshToken} from "@entities/api_provider/_requests.ts";
import {useCookies} from "react-cookie";
import {useAuth} from "@entities/auth_provider";
import {throttleAdapterEnhancer} from "axios-extensions";

const initialValue: IApiProvider = {api: undefined as unknown as typeof axios}
const Context = createContext<IApiProvider>(initialValue);
export const useApi = () => useContext<IApiProvider>(Context)
window.process = { ...window.process, env: { LOGGER_LEVEL: "warn" } };
export const ApiProvider: FC<PropsWithChildren> = ({children}) => {

    const defaultAdapter = axios.getAdapter(axios.defaults.adapter);
        const [cookies, setCookie, removeCookie] = useCookies();
    const {setUser, setToken} = useAuth();
    const api = axios.create({
        baseURL: API_URL,
        adapter: throttleAdapterEnhancer(defaultAdapter as AxiosAdapter, { threshold: 2 * 1000 }),
        headers: {
            "Cache-Control": "no-cache",
            Authorization: cookies.token && cookies.token.length === 0 ? undefined : `Bearer ${cookies.token}`
        },
    });
    api.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error && error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const token = cookies.token;
                try {
                    const {access_token, user} = await refreshToken(token);
                    setCookie("token", access_token);
                    setCookie("user", user);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
                    return axios(originalRequest);
                } catch (error) {
                    removeCookie("token");
                    removeCookie("user");
                    setToken(undefined);
                    throw error;
                }
            }
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        if (cookies.token && cookies.token.length > 0) {
            setUser(cookies.user);
            setToken(cookies.token);
        }
    }, []);

    return <Context.Provider value={{api}}>{children}</Context.Provider>
}