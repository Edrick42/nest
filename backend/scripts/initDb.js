require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

async function createSchemas() {
  try {
    await pool.query('CREATE SCHEMA IF NOT EXISTS auth;')
    await pool.query('CREATE SCHEMA IF NOT EXISTS work;')
    console.log('✅ Schemas criados com sucesso')
  } catch (error) {
    console.error('❌ Erro ao criar schemas:', error)
  } finally {
    await pool.end()
  }
}

createSchemas()
