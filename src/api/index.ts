import axios from "axios";

export type Category = 'auto' | 'real_estate' | 'electronics';

export const CATEGORY_LABELS: Record<Category, string>= {
    auto: "Авто",
    real_estate: "Недвижимость",
    electronics: "Электроника"
}

export interface AutoItemParams {
    brand?: string;
    model?: string;
    yearOfManufacture?: number;
    transmission?: 'automatic' | 'manual';
    mileage?: number;
    enginePower?: number;
}

export interface RealEstateItemParams {
    type?: 'flat' | 'house' | 'room';
    address?: string;
    area?: number;
    floor?: number;
};

export interface ElectronicsItemParams  {
    type?: 'phone' | 'laptop' | 'misc';
    brand?: string;
    model?: string;
    condition?: 'new' | 'used';
    color?: string;
};

export interface AdItem {
    id: string | number;
    category: Category;
    title: string;
    price: number;
    description?: string;
    createdAt: string;
    needsRevision: boolean;
    params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
}

export type UpdateAdData = {
    category: Category;
    title: string;
    description?: string;
    price: number;
    params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
};

export interface ItemsResponse {
    items: AdItem[];
    total: number;
}

const api = axios.create({
    baseURL: '/api'
})


export const getAds = async (params: {
    q?: string;
    limit?: number;
    skip?: number;
    needsRevision?: boolean;
    categories?: string; 
    sortColumn?: 'title' | 'createdAt';
    sortDirection?: 'asc' | 'desc';
}) => {
    const {data} = await api.get<ItemsResponse>('/items', {params});
    console.log("Ответ от бэка (getAds):", data);
    return data; 
}   

export const getAdById = async(id: string | number) => {
    const {data} = await api.get<AdItem>(`/items/${id}`)
    console.log("Данные объявления: ",data);
    return data;
}

export const updateAd = async (id: string | number, updateData: UpdateAdData) => {
    const { data } = await api.put<AdItem>(`/items/${id}`, updateData);
    console.log("Объявление обновлено:", data);
    return data;
};