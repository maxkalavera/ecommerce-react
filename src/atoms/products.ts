import { atom } from 'jotai';
import { ProductsFLowFilters, ProductsFLowSort } from '@/types/products';

/**
 * Constants
 */

export const initialProductsFlowFilters: ProductsFLowFilters = {
  color: [],
  size: [],
  priceMax: undefined,
};

/**
 * Atoms
 */

export const productsFlowFiltersAtom = atom<ProductsFLowFilters>(initialProductsFlowFilters);

export const productsFlowSortAtom = atom<ProductsFLowSort>({
  sort: undefined,
});