import { DialogProps } from "@radix-ui/react-dialog";

export type ID = number | string;

export interface Instance {
  id?: ID
}

export interface ResizableImage extends Instance {
  image: string;
  thumbnail?: string;
}

export interface Category extends Instance {
  referenceKey: string;
  name: string;
  display?: ResizableImage;
  hierarchy?: {
    parents: Category[];
    children?: Category[];
  }
}

export interface ProductLabel {
  content: string;
  color?: string;
}

export interface Product extends Instance {
  name: string;
  price: string;
  currency: string;
  description: string;
  isFavorite: boolean;
  isOnCart: boolean;
  label?: ProductLabel;
  display?: ResizableImage;
  gallery: ResizableImage[];
}

export type DialogComponent = React.FC<DialogProps>;