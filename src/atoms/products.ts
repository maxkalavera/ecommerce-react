import { atom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import productsData from "@/assets/mock/products.json";
import { Product as ProductType } from '@/types/types';

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
