import {createContext, FC, PropsWithChildren, useContext} from "react";
import {useApi} from "@entities/api_provider";
import {IProfileApiProvider} from "@pages/profile/model";

const initialValue = {} as IProfileApiProvider;
const Context = createContext<IProfileApiProvider>(initialValue);
export const useProfileApi = () => useContext<IProfileApiProvider>(Context);

export const ProfileApiProvider: FC<PropsWithChildren> = ({children}) => {
    const {api} = useApi();


    return <Context.Provider value={{

    }}>{children}</Context.Provider>
}