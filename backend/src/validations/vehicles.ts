import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().uuid(),
})

export const bodySchema = z.object({
  plaque: z.string(),
  model: z.string(),
  email: z.string().email(),
})

export const bodySchema2 = z.object({
  plaque: z.string(),
  model: z.string(),
  entry: z.date(),
  exit: z.date(),
  totalTime: z.number(),
  totalSpent: z.number(),
  amountPaid: z.number(),
  change: z.number(),
})
