import {z} from 'zod'

// DateStr is a string that represents a date in the format 'YYYY-MM-DD'
export const dateStrSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)


export type DateStr = z.infer<typeof dateStrSchema>