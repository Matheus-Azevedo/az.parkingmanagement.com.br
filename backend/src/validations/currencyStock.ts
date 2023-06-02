import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().uuid(),
})

export const bodySchema = z.object({
  name: z.string(),
  value: z.number(),
  type: z.string(),
  quantity: z.number(),
})
