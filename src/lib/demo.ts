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
  filterCategories: function (
    {
      rootCategory=undefined,
      searchTerm=undefined,
    }: CategoryFilters = {}
  ) {
    let reduced = this.categories;

    if (rootCategory !== undefined) {
      reduced = reduced.filter(
        (category) => category.hierarchy?.parents.some(parent => parent.key === rootCategory)
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
      searchTerm
    }: ProductFilters
  ) {
    let reduced = this.products;

    if (searchTerm !== undefined) {
      const regex = new RegExp(`\s?[a-zA-Z]*${searchTerm.replace(" ", "|")}[a-zA-Z]*\s?`, 'gi');
      reduced = reduced.filter(
        (product) => regex.test(product.name)
      )
    }

    return reduced;
  }
};