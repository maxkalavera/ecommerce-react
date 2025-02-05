import { Category } from "./categories";
import { Instance, ResizableImage } from "./types";

export interface ProductLabel {
  content: string;
  color?: string;
}

export interface Product extends Instance {
  name: string;
  price: string;
  currency: string;
  description: string;
  isFavorite?: boolean;
  isOnCart?: boolean;
  label?: ProductLabel;
  display?: ResizableImage;
  gallery: ResizableImage[];
  categories: Category[];
}

export interface ProductFilters {
  searchTerm?: string;
  featured?: boolean;
  category?: Category;
}