import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().uuid(),
})

export const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'user']),
})
