import { sql } from 'drizzle-orm'
import { int, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

const usersSchema = sqliteTable(
  'users',
  {
    id: int('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    surname: text('surname').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
  },
  table => [uniqueIndex('emailUniqueIndex').on(sql`lower(${table.email})`)]
)

type User = typeof usersSchema.$inferSelect
type UsersInsert = typeof usersSchema.$inferInsert

export default usersSchema

export type { User, UsersInsert }
