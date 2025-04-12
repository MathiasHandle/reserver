import { z } from 'zod'

const eventInsertSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').max(100, 'Name is too long'),
  date: z.string().datetime('Invalid date format'),
  categoryId: z.number().int('Category ID must be an integer'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(1000, 'Description is too long'),
  maxCapacity: z.number().int('Capacity must be an integer').min(1, 'Capacity must be at least 1'),
})

export default eventInsertSchema
