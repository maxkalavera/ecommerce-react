import {
  QueryFunctionContext,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { defaults } from './defaults';
import { Category as CategoryType, CategoryFilters } from '@/types/categories';
import settings from '@/settings';
import demo from '@/lib/demo';

export const fetchCategories = async (params: QueryFunctionContext) => {
  const filters = params.queryKey[1];
  if (settings.environment === 'demo') {
    return demo.filterCategories(filters as any);
  }
  return [];
}

export const useCategoriesQuery = (
  filters: CategoryFilters = {}
) => {
  return useQuery({
    ...defaults,
    initialData: [],
    queryKey: ["categories", filters],
    queryFn: fetchCategories,
  }) as UseQueryResult<CategoryType[]>;
};