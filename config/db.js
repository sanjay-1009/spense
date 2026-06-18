const mysql = require("mysql2");

const db = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,

    timezone: "+05:30",
    dateStrings: true

});

db.connect((err) => {

    if (err) {
        console.log("Database Error:", err);
        return;
    }

    console.log("MySQL Connected Successfully");

});

module.exports = db;