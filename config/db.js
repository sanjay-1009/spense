const mysql = require("mysql2");

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "admin",
    database: "spense_db",

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