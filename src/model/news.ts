import {z} from 'zod'



// Assume 0 denotes neutral, 1 denotes positive, -1 denotes negative

const newsTypeValues = {
    neutral:0,
    positive:1,
    negative:-1
} as const;

const newsTypeValueSchema = z.nativeEnum(newsTypeValues);

const newsTypeSchema = z.record(z.string(),newsTypeValueSchema.optional());

export const newsEntrySchema = z.object({
    Prediction: z.string(),
    Bloomberg: z.string(),
    Side: z.enum(['long','short','no action']),
    'News Type': newsTypeSchema,
    Headline: z.string(),
    'Primary Reporter': z.string(),
    'Exchange Region': z.string(),
    UID: z.string()
});


export type NewsEntry = z.infer<typeof newsEntrySchema>

export const newsDataSchema = z.array(newsEntrySchema);

export type NewsData = z.infer<typeof newsDataSchema>