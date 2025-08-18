import { Instance, ResizableImage } from "./commons";

export interface Category extends Instance {
  name: string;
  display: ResizableImage | null;
  parentKey: Category['key'] | null;
  parent: Category | null;
}

export interface CategoryFilters {
  childrenOf?: Category['key'],
  //searchTerm?: string,
}