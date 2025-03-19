import { Instance, ResizableImage } from "./types";

export interface Category extends Instance {
  name: string;
  display?: ResizableImage | null;
  hierarchy?: {
    parents: Category[];
    children?: Category[];
  }
}

export interface CategoryFilters {
  rootCategory?: Category['key'],
  searchTerm?: string,
}