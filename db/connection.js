const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'employee_db'
});

module.exports = db;