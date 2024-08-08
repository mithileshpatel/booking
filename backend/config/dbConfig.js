const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'booking_db' // Use your database name
});

// Export the pool for use in other files
module.exports = pool.promise();
