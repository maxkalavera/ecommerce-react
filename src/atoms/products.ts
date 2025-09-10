import { atom } from 'jotai';
import { ProductsFLowFilters, ProductsFLowSort } from '@/types/products';

/**
 * Constants
 */

export const initialProductsFlowFilters: ProductsFLowFilters = {
  color: [],
  size: [],
  maxPrice: undefined,
};

/**
 * Atoms
 */

export const productsFlowFiltersAtom = atom<ProductsFLowFilters>(initialProductsFlowFilters);

export const productsFlowSortAtom = atom<ProductsFLowSort>({
  sortBy: undefined,
});