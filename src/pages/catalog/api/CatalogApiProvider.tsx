import {AxiosResponse} from "axios";
import {createContext, FC, PropsWithChildren, useContext} from "react";
import {
    ICatalogApiProvider,
    IDispatchProductResponse,
    IProductIdResponse,
    IProductsAllResponse
} from "@pages/catalog/model";
import {useApi} from "@entities/api_provider/ApiProvider.tsx";

const initialValue = {} as ICatalogApiProvider;
const Context = createContext<ICatalogApiProvider>(initialValue);
export const useCatalogApi = () => useContext<ICatalogApiProvider>(Context);

export const CatalogApiProvider: FC<PropsWithChildren> = ({children}) => {
    const {api} = useApi();
    async function productsAll(page: number = 0,): Promise<IProductsAllResponse> {
        return await api.get(`/lots/list?page=${page}`).then(
            (r: AxiosResponse<IProductsAllResponse>) => r.data
        )
    }

    async function productId(id: string | number): Promise<IProductIdResponse> {
        return await api.get(`/lots/get/${id}`).then(
            (r: AxiosResponse<IProductIdResponse>) => r.data
        )
    }

    async function addToFavorites(id: string | number): Promise<IDispatchProductResponse> {
        return await api.post(`/favorites/add`, {lot_id: id}).then(
            (r: AxiosResponse<IDispatchProductResponse>) => r.data
        )
    }

    async function removeFromFavorites(id: string | number): Promise<IDispatchProductResponse> {
        return await api.post(`/favorites/remove`, {lot_id: id}).then(
            (r: AxiosResponse<IDispatchProductResponse>) => r.data
        )
    }

    async function bid(id: string | number, bid: number): Promise<IDispatchProductResponse> {
        return await api.post(`/lots/set-bid`, {lot_id: id, bid: bid}).then(
            (r: AxiosResponse<IDispatchProductResponse>) => r.data
        )
    }

    return <Context.Provider value={{
        productsAll,
        productId,
        addToFavorites,
        removeFromFavorites,
        bid
    }}>{children}</Context.Provider>
}