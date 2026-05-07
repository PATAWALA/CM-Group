export type Category = 'real-estate' | 'vehicle' | 'it' | 'electronics';

export interface Product {
  id: number;
  category: Category;
  title: string;
  price: number;
  currency: string;
  image_url: string;
  description: string;
  details: {
    type?: string;
    location?: string;
    surface?: number;
    rooms?: number;
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    fuel?: string;
    transmission?: string;
    never_crashed?: boolean;
    brand_manufacturer?: string;
    specifications?: string;
    warranty?: string;
  };
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };