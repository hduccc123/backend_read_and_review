import dotenv from 'dotenv';
const mysql = require('mysql2');

// Load environment variables from .env file
dotenv.config();

// Tạo connection pool (hiệu quả hơn so với kết nối đơn)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export Promise-based pool
const promisePool = pool.promise();

module.exports = promisePool;
