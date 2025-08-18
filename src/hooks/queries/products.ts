import axios from 'axios';
import { Product as ProductType, ProductFilters } from '@/types/products';
import { useGetQuery, usePaginatedQuery } from '@/lib/queries';


export function useProductsQuery (
  filters: ProductFilters,
) {
  return usePaginatedQuery<ProductType>(
    'useProductsQuery',
    [
      filters.category,
    ],
    async ([cursor, category], { resolveURL }) => {
      const response = await axios.get(resolveURL('/products'), {
        params: {
          cursor,
          category: category,
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


