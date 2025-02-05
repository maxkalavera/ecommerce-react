import { Category } from "./types/categories";
import { ShopSortByOption } from "./types/shop";


export default {
  environment: process.env['NEXT_PUBLIC_ENVIRONMENT'],
  categories: {
    tabs: [
      {
        "key": "YgMVlkiMSs",
        "name": "Women",
      },
      {
        "key": "rdvc3N3wO",
        "name": "Men",
      }
    ],
  },
  shopSortByOptions: [
    {
      label: "Relevance",
      key: "relevance"
    },
    {
      label: "Trending",
      key: "treanding"
    },
    {
      label: "Latest arrival",
      key: "latest-arrival"
    },
    {
      label: "Price: Low to high",
      key: "price-descending"
    },
    {
      label: "Price: High to low",
      key: "price-ascending"
    },
  ]
} as {
  environment: "demo" | "production" | "development";
  categories: {
    tabs: Category[];
  };
  shopSortByOptions: ShopSortByOption[];
};