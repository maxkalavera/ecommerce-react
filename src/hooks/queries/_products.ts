
import {
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import settings from '@/settings';
import { Product as ProductType, ProductFilters } from '@/types/products';
import demo from '@/lib/demo';
import { CursorPaginatedQueryFunction, InstanceQueryFunction } from '@/types/api';
//import { APIError } from '@/lib/queries';
*/

/*
export const fetchProducts = (async (params) => {
  const filters = params.queryKey[1];
  if (settings.environment === 'demo') {
    return {
      items: demo.filterProducts(filters as ProductFilters) as ProductType[],
      nextCursor: null
    };
  }
  return {
    items: [],
    nextCursor: null
  };
}) as CursorPaginatedQueryFunction<ProductType, [ProductFilters]>;

export const useProductsQuery = (
  filters: ProductFilters = {}
) => {
  return useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: fetchProducts,
    initialPageParam: null,
    getNextPageParam: (lastPage,) => lastPage.nextCursor,
  });
};

export const fetchProduct:
  InstanceQueryFunction<ProductType, [ProductType['key']]> = async (params) => 
{
  if (settings.environment === 'demo') {
    const instance = demo.getProduct(params.queryKey[1]);
    if (instance !== undefined) {
      return { instance };
    }
  }

  throw new APIError("Product could not been retrived", "product-not-retrived");
};

export const useCategoryQuery = (
  productKey: ProductType['key']
) => {
  return useQuery({
    queryKey: ["product", productKey],
    queryFn: fetchProduct,
  });
};
