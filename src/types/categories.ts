import { Instance, ResizableImage } from "./types";

export interface Category extends Instance {
  key: string;
  name: string;
  display?: ResizableImage;
  hierarchy?: {
    parents: Category[];
    children?: Category[];
  }
}

export interface CategoryFilters {
  rootCategory?: Category['key'],
  searchTerm?: string,
}