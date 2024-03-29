import {IBid} from "@pages/catalog/model";

export interface IProduct {
    id: number;
    age: number;
    bidsCount?: number;
    bottle_size?: string;
    bottler?: string;
    description?: string;
    distillery?: string;
    distillery_status?: string;
    favorite?: boolean;
    nextBid?: number;
    cask_type?: string;
    pictures?: string;
    strength?: string;
    auction?: any;
    vintage?: string;
    title: string;
    created_at?: Date;
    updated_at?: Date;
    region_id?: number;
    bid?: IBid;
}