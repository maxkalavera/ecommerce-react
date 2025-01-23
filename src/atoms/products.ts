import { atom } from 'jotai';
import productsData from "@/assets/mock/products.json";

export const productsAtom = atom({
  items: productsData,
  loading: false,
  hasMore: false,
});

export const featuredProductsAtom = atom({
  items: productsData,
  loading: false,
  hasMore: false,
});

export const favoriteProductsAtom = atom({
  items: productsData,
  loading: false,
  hasMore: false,
});

export const cartProductsAtom = atom({
  items: productsData,
  loading: false,
  hasMore: false,
});
