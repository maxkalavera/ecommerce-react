
"use client"
import axios from 'axios';
import { Category as CategoryType, CategoryFilters } from '@/types/categories';
import { useRequest, usePaginatedQuery, type PayloadMany, type PayloadSingle } from '@/lib/queries';


export function useCategoriesQuery (
  filters: CategoryFilters
)
{
  return useRequest<PayloadMany<CategoryType>>(
    'useCategoriesQuery',
    [filters.childrenOf],
    async ([childrenOf], { resolveURL }) => {
      const response = await axios.get(resolveURL('/categories'), {
        headers: {
          'accept': 'application/json',
        },
        params: {
          childrenOf: childrenOf,
        },
      });
      return response;
    },
    {
      items: [],
      cursor: null,
      hasMore: false,
    }, 
  );
}

export const useCategoryQuery = (
  categoryKey: CategoryType['key']
) => {
  return useRequest<PayloadSingle<any>>(
    'useCategoryQuery',
    [categoryKey],
    async ([categoryKey], { resolveURL }) => {
      const response = await axios.get(resolveURL(`categories/${categoryKey}`), {
        headers: {
          'accept': 'application/json',
        },
        params: {
          key: categoryKey,
        },
      });
      return response;
    },
    {
      data: null,
    }, 
  );
};