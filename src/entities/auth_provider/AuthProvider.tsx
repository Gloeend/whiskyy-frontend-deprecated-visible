import {createContext, FC, PropsWithChildren, useContext, useState} from "react";
import {IAuthProvider, IUser} from "@entities/auth_provider/AuthProvider.types.ts";
import {useCookies} from "react-cookie";
const initialValue: IAuthProvider = {
    setUser: () => {
    },
    setToken: () => {
    },
    logout: () => {}
}

const initialUser: IUser = {
    name: "",
    last_name: "",
    email: "",
    country: "",
    city: "",
    postcode: ""
}


const Context = createContext<IAuthProvider>(initialValue);
export const useAuth = () => useContext<IAuthProvider>(Context)
export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [_cookie, _setCookie, removeCookie ] = useCookies();
    const [user, setUser] = useState<IUser>(initialUser);
    const [token, setToken] = useState<string | undefined>(undefined);
    const logout = () => {
        removeCookie("user");
        removeCookie("token");
        setUser(initialUser);
        setToken(undefined);
    };

    return <Context.Provider value={{
        user,
        setUser,
        token,
        setToken,
        logout
    }}>{children}</Context.Provider>
}
