const sql = require('mssql')
require('dotenv').config()

const config = {
  server: process.env.DATABASE_URL || mysql://admin_digtal_menu:01xaMxar2j6Cn7Gd2PJAFLX:SE.5Ye__@digtal-menu.db-836.svc.cluster.local:3306/digtal_menu',
  database: process.env.DB_NAME || 'digtal_menu',
  user: process.env.DB_USER || 'admin_digtal_menu',
  password: process.env.DB_PASSWORD || '01xaMxar2j6Cn7Gd2PJAFLX:SE.5Ye__',
  options: {
    trustServerCertificate: true,
    encrypt: false,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
}

let pool = null

async function getPool() {
  if (pool) return pool
  try {
    pool = await sql.connect(config)
    console.log('✅ Connected to SQL Server RestaurantDB')
    return pool
  } catch (err) {
    pool = null
    console.error('❌ DB Error:', err.message)
    throw err
  }
}

async function query(sqlText, params = {}) {
  const p = await getPool()
  const request = p.request()
  Object.entries(params).forEach(([key, { type, value }]) => {
    request.input(key, type, value)
  })
  return request.query(sqlText)
}

module.exports = { sql, query, getPool }
