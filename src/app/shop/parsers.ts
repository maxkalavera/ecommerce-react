import { z } from 'zod';
import settings from '@/settings';

export const shopURLSchema = z.object({
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
  color: z.string().optional(),
  size: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.lowerprice && data.higherprice && data.lowerprice >= data.higherprice) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "lowerprice can't be equal or higher than higherprice"
    });
  }
});
