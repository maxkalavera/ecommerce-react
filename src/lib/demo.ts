/* eslint-disable import/no-anonymous-default-export */
import { Category as CategoryType, CategoryFilters } from "@/types/categories";
import { Product as ProductType, ProductFilters } from "@/types/products";
import categoriesData from "@/assets/mock/categories.json";
import productsData from "@/assets/mock/products.json";

export default {
  /****************************************************************************
  * Attributes
  */
  categories: categoriesData as CategoryType[],
  products: productsData as ProductType[],
  /****************************************************************************
   * Methods  
   */
  getCategory: function (
    key: CategoryType['key']
  ): CategoryType | null {
    return categoriesData.find(category => category.key === key) || null;
  },
  filterCategories: function (
    {
      rootCategory=undefined,
      searchTerm=undefined,
    }: CategoryFilters = {}
  ) {
    let reduced = this.categories;

    if (rootCategory !== undefined) {
      reduced = reduced.filter(
        (category) => {
          return category.hierarchy.parent?.key === rootCategory;
        }
      )
    }

    if (searchTerm !== undefined) {
      const regex = new RegExp(`\s?[a-zA-Z]*${searchTerm.replace(" ", "|")}[a-zA-Z]*\s?`, 'gi');
      reduced = reduced.filter(
        (category) => regex.test(category.name)
      )
    }

    return reduced
  },
  filterProducts: function (
    {
      searchTerm=undefined,
      category=undefined,
    }: ProductFilters
  ) {
    let reduced = this.products;

    if (searchTerm !== undefined) {
      const regex = new RegExp(`\s?[a-zA-Z]*${searchTerm.replace(" ", "|")}[a-zA-Z]*\s?`, 'gi');
      reduced = reduced.filter(
        (product) => regex.test(product.name)
      )
    }

    if (category !== undefined) {
      // Filter by category
      reduced.filter(product => product.category?.key === category.key);
    }

    return reduced;
  }
};