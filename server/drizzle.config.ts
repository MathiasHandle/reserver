import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: ['./src/model/*'],
  out: './migrations',
  dbCredentials: {
    url: './database.db',
  },
  dialect: 'sqlite',
  verbose: true,
  strict: true,
})
