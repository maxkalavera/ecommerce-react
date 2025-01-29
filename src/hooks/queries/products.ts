import {
  QueryFunctionContext,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { defaults } from './defaults';
import settings from '@/settings';
import { Product as ProductType, ProductFilters } from '@/types/products';
import demo from '@/lib/demo';

export const fetchProducts = async (params: QueryFunctionContext) => {
  const filters = params.queryKey[1];
  if (settings.environment === 'demo') {
    return demo.filterProducts(filters as any);
  }
  return [];
}

export const useProductsQuery = (
  filters: ProductFilters = {}
) => {
  return useQuery({
    ...defaults,
    initialData: [],
    queryKey: ["products", filters],
    queryFn: fetchProducts,
  }) as UseQueryResult<ProductType[]>;
};
