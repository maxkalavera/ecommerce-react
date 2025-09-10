import axios from 'axios';
import { Product as ProductType, ProductFilters } from '@/types/products';
import { useGetQuery, usePaginatedQuery } from '@/lib/queries';


export function useProductsQuery (
  params: Partial<{
    category: string,
    sortBy: string;
    color: string;
    size: string;
    maxPrice: number;
  }> = {}
) {
  return usePaginatedQuery<ProductType>(
    'useProductsQuery',
    [
      params.category,
      params.sortBy,
      params.color,
      params.size,
      params.maxPrice,
    ],
    async ([cursor, category, sortBy, color, size, maxPrice], { resolveURL }) => {
      const response = await axios.get(resolveURL('/products'), {
        params: {
          cursor,
          category,
          sortBy,
          color,
          size,
          maxPrice,
        },
        headers: {
          'accept': 'application/json',
        },
      });
      return response;
    },
  );
}

export function useProductQuery (key: string) {
  return useGetQuery<ProductType>(
    'useProductQuery',
    [key],
    async ([], { resolveURL }) => {
      const response = await axios.get(resolveURL(`/products/${key}`), {
        headers: {
          'accept': 'application/json',
        },
      });
      return response;
    },
  );
}


