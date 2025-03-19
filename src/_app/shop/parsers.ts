import { z } from 'zod';
import { Category } from "@/types/categories";
import { ShopURLParams } from "@/types/shop";
import settings from '@/settings';

function createShopURLSchema (
  category?: Category
) {
  var shopURLSchema = z.object({
    search: z.string().optional(),
    lowerprice: z.number().min(50).max(10000).optional(),
    higherprice: z.number().min(50).max(10000).optional(),
    sort: z.string().refine(
      (value) => {
        return settings.shopSortByOptions.some(option => option.key === value)
      }, {
        "message": "Sort has an invalid option"
      }
    ).optional(),
  })

  if (category) {
    shopURLSchema.extend({
      color: z.string().optional(),
      size: z.string().optional(),
    });
  }

  return shopURLSchema.superRefine((data, ctx) => {
    if (data.lowerprice && data.higherprice && data.lowerprice >= data.higherprice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "lowerprice can't be equal or higher than higherprice"
      });
    }
    console.log(data);
  });
}


const parseShopURLParams = async (
  params: ShopURLParams,
  category?: Category,
) => {
  const shopURLSchema = createShopURLSchema(category);
  const result = await shopURLSchema.safeParseAsync(params);
  return result.data || {};
};

export default parseShopURLParams;