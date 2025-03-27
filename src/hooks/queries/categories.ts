import {
  useQuery,
} from '@tanstack/react-query';
import { Category as CategoryType, CategoryFilters } from '@/types/categories';
import settings from '@/settings';
import demo from '@/lib/demo';
import { InstanceQueryFunction, ManyQueryFunction } from '@/types/api';
import { APIError } from '@/lib/queries';

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
};

export const useCategoriesQuery = (
  filters: CategoryFilters = {}
) => {
  return useQuery({
    initialData: { items: [] },
    queryKey: ["categories", filters],
    queryFn: fetchCategories,
  });
};


export const fetchCategory:
  InstanceQueryFunction<CategoryType, [CategoryType['key']]> = async (params) => 
{
  if (settings.environment === 'demo') {
    const instance = demo.getCategory(params.queryKey[1]);
    if (instance !== null) {
      return { instance };
    }
  }

  throw new APIError("Category could not been retrived", "category-not-retrived");
};

export const useCategoryQuery = (
  categoryKey: CategoryType['key']
) => {
  return useQuery({
    queryKey: ["category", categoryKey],
    queryFn: fetchCategory,
  });
};
