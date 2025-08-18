import { OptionItem } from '@/types/navigation';


export interface ShopFilters {
  search: string;
  categoryKey: string;
  color: string;
  size: string;
  lowerprice: string;
  higherprice: string;
};

export type ShopURLParams = {
  search?: string;
  category?: string;
  color?: string;
  size?: string;
  lowerprice?: string;
  higherprice?: string;
  sort?: string;
};

export type ShopParams = {
  search?: string;
  category?: string;
  color?: string;
  size?: string;
  priceRange?: [number, number];
  sortBy?: OptionItem;
};