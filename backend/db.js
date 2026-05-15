const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendaRopa'
});

connection.connect((err) => {
    if (err) {
        console.error("Error", err);
        return;
    } else {
        console.log("BD conectada");
    }
});

module.exports = connection;