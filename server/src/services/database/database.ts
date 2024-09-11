import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'

const sqlite = new Database('database.db')
const db: BetterSQLite3Database = drizzle(sqlite)

export default db
