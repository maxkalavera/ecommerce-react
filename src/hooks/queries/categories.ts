import {
  QueryFunctionContext,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { Category as CategoryType, CategoryFilters } from '@/types/categories';
import settings from '@/settings';
import demo from '@/lib/demo';
import { ManyQueryFunction } from '@/types/api';

export const fetchCategories: 
  ManyQueryFunction<CategoryType, [CategoryFilters]> = 
  async (params) => 
{
  const filters = params.queryKey[1];
  if (settings.environment === 'demo') {
    return {
      items: demo.filterCategories(filters as CategoryFilters)
    };
  }
  return {
    items: []
  };
}

export const useCategoriesQuery = (
  filters: CategoryFilters = {}
) => {
  return useQuery({
    initialData: { items: [] },
    queryKey: ["categories", filters],
    queryFn: fetchCategories,
  });
};