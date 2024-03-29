export interface IProduct {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    region_id: null;
    title: string;
    pictures: string;
    description: string;
    distillery: string;
    age: string;
    vintage: string;
    bottler: string;
    cask_type: string;
    strength: string;
    bottle_size: string;
    distillery_status: string;
}