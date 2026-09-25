const mysql = require('mysql2/promise')
require('dotenv').config()

// Create a connection pool using environment variables with fallbacks
const pool = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQL_HOST || 'digtal-menu.db-836.svc.cluster.local',
  port: process.env.DB_PORT || process.env.MYSQL_PORT || 3306,
  user: process.env.DB_USER || process.env.DB_USERNAME || process.env.MYSQL_USER || 'admin_digtal_menu',
  password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '01xaMxar2j6Cn7Gd2PJAFLX:SE.5Ye__',
  database: process.env.DB_NAME || process.env.DB_DATABASE || process.env.MYSQL_DATABASE || 'digtal_menu',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

/**
 * Execute a SQL query with parameter binding.
 * @param {string} sqlText - The SQL query string (use ? for placeholders).
 * @param {Array} params - Array of parameter values to insert into placeholders.
 */
async function query(sqlText, params = []) {
  try {
    const [rows, fields] = await pool.query(sqlText, params)
    return rows
  } catch (err) {
    console.error('❌ DB Error:', err.message)
    throw err
  }
}

/**
 * Helper to get pool connection status or raw connection.
 */
async function getPool() {
  try {
    const connection = await pool.getConnection()
    console.log('✅ Connected to MySQL Database')
    connection.release()
    return pool
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message)
    throw err
  }
}

module.exports = { query, getPool, pool }
