import { Pool } from 'pg'

export const pool = new Pool({ user: 'alex', password: '2411', host: 'localhost', port: 5432, database: 'test_db' })
