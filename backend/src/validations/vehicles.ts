import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().uuid(),
})

export const bodySchema = z.object({
  plaque: z.string(),
  model: z.string(),
})
