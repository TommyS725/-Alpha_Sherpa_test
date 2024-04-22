import { dateStrSchema } from "./utils";
import { z } from "zod";


export const dailyDataSchema = z.object({
    open: z.number(),
    high: z.number(),
    low: z.number(),
    volume: z.number(),
    bid: z.number(),
    ask: z.number(),
    last_price: z.number(),
});

export type DailyData = z.infer<typeof dailyDataSchema>

export const marketDataSchema = z.object({
    success: z.string().transform(x=>x==="true"),
    data:z.record(dateStrSchema, dailyDataSchema),
    fx_rate: z.number(),
    RIC_used: z.string(),
})


export type MarketData = z.infer<typeof marketDataSchema>
