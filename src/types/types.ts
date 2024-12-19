
export type ID = number | string;

export interface Instance {
  id: ID
}

export interface Category extends Instance {
  name: string;
  picture?: string;
}



export interface ProductLabel {
  content: string,
  color?: string,
}

export interface ProductImage extends Instance {
  image: string;
  thumbnail: string;
}

export interface Product extends Instance {
  name: string;
  price: string;
  currency: string;
  description: string;
  isFavorite: boolean;
  isOnCart: boolean;
  label?: ProductLabel;
  picture?: ProductImage;
  gallery: ProductImage[];
}