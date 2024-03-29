import {IProduct} from "src/entities/product";

export interface ICatalogApiProvider {
    productsAll(page: number): Promise<IProductsAllResponse>;
    productId(id: string | number, forceUpdate?: boolean): Promise<IProductIdResponse>;
    addToFavorites(id: string | number): Promise<IDispatchProductResponse>;
    removeFromFavorites(id: string | number): Promise<IDispatchProductResponse>;
    bid(id: string | number, bid: number): Promise<IDispatchProductResponse>;
}

export interface IProductsAllResponse {
    data: ILot[];
    last_page: number;
}

export interface IProductIdResponse extends ILot {
}
export interface IDispatchProductResponse {
    data: ILot;
    message: string;
}

export interface ILot {
    id: number;
    created_at?: Date;
    updated_at?: Date;
    current_bid?: number;
    reserve_price?: number;
    product_id: number;
    product: IProduct;
}

export interface IBid {
    id: number;
    created_at?: Date;
    updated_at?: Date;
    auction: any;
    auction_id: number;
    bid: number;
    highest: boolean;

}

export const lotInitial: ILot = {
    id: 0,
    created_at: undefined,
    updated_at: undefined,
    current_bid: 0,
    product: {
        id: 0,
        age: 0,
        title: ""
    },
    product_id: 0,
    reserve_price: 0,
}