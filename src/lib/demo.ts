import { CategoryFilters } from "@/types/categories";
import categoriesData from "@/assets/mock/categories.json";
import productsData from "@/assets/mock/products.json";
import { ProductFilters } from "@/types/products";

export default {
  /****************************************************************************
  * Attributes
  */
  categories: categoriesData,
  products: productsData,
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
        (category) => category.hierarchy.parents.some(parent => parent.key === rootCategory)
      )
    }

    if (searchTerm !== undefined) {
      const regex = new RegExp(searchTerm.replace(" ", "|"), 'gi');
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
      const regex = new RegExp(searchTerm.replace(" ", "|"), 'gi');
      reduced = reduced.filter(
        (product) => regex.test(product.name)
      )
    }

    return reduced;
  }
};