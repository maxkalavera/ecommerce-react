import { Category } from "./categories";
import { Instance, Image } from "./commons";

export interface ProductLabel {
  content: string;
  color: string;
}

export interface Product extends Instance {
  name: string;
  description: string;
  price: string;
  size: string;
  color: {
    name: string;
    hex: string;
  };
  label: ProductLabel;
  isFavorite: boolean;
  isOnCart: boolean;
  images: Image[];
  category: {
    key: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
  } | null;
  categoryBreadcrumbs: ({
    key: string;
    name: string;
  }[]) | null;
  inventory: {
    productKey: string;
    color: string;
    colorHex: string;
    size: string;
    quantity: number;
  }[];
  maxAvailability: number;
}

export interface ProductFilters {
  category?: Category['key'];
  searchTerm?: string;
  featured?: boolean;
}

export interface ProductsFLowFilters {
  color: string[];
  size: string[];
  maxPrice?: number;
}

export interface ProductsFLowSort {
  sortBy?: 'relevance' | 'trending' | 'latest-arrival' | 'price-low-high' | 'price-high-low';
}
