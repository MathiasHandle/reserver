import { config } from 'dotenv'
import type { ZodError } from 'zod'
import { z } from 'zod'

const envFile = config({ path: `.env.${process.env.NODE_ENV}` })

const envSchema = z.object({
  NODE_ENV: z
    .union([z.literal('development'), z.literal('prod')])
    .default(process.env.NODE_ENV as 'development' | 'prod'),
  ORIGIN: z.string(),
  PORT: z.coerce.number(),
})

type Env = z.infer<typeof envSchema>

let env: Env

try {
  env = envSchema.parse({
    ...envFile.parsed,
    NODE_ENV: process.env.NODE_ENV,
  })
} catch (err) {
  const error = err as ZodError
  console.error(error.format(issue => issue.message))
  process.exit(1)
}

export default env
