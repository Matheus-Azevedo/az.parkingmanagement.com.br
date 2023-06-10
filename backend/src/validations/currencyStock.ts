import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().uuid(),
})

export const bodySchema = z.object({
  value: z.string(),
  type: z.string(),
  quantity: z.number(),
  origin: z.string(),
})

export const bodySchema2 = z.object({
  quantity: z.number(),
})
