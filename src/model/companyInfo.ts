import { z } from "zod";

export const companyInfoSchema = z.object({
  success: z.boolean(),
  data: z.object({
    BBY: z.string(),
    RIC: z.string(),
    company_name: z.string(),
    currency: z.string(),
    datetime: z.number(),
    figi: z.string(),
    gics1: z.string(),
    gics2: z.string(),
    gics3: z.string(),
    gics4: z.string(),
    isin: z.string(),
    market_cap_usd: z.number(),
    sedol1: z.string(),
  }),
});

export type CompanyInfo = z.infer<typeof companyInfoSchema>;
