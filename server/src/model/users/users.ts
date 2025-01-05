import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const usersSchema = sqliteTable('users', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
})

type User = typeof usersSchema.$inferSelect
type UsersInsert = typeof usersSchema.$inferInsert

export default usersSchema

export type { User, UsersInsert }
