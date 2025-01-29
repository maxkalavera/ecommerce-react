import categoriesData from "@/assets/mock/categories.json";

interface fetchCategoriesParams {

}

export const fetchCategories: Function = () => {

}

export const getCategories = async ({
  parentKey=undefined
}: {
  parentKey?: string | undefined
}) => {
  return categoriesData.filter(
    (category) => category.hierarchy.parents.some(parent => parent.key === parentKey)
  );
};

