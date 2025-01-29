import { Category } from "./types/types";


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
} as {
  environment: "demo" | "production" | "development";
  categories: {
    tabs: Category[];
  };
};