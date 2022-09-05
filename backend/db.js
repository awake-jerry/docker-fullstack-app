const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'sleepyjoe',
    database: 'myapp'
});

exports.pool = pool;