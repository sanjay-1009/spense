CREATE DATABASE IF NOT EXISTS spense_db;

USE spense_db;

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role ENUM('user','admin') DEFAULT 'user',

    last_active DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE expenses (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    expense_date DATE NOT NULL,

    food DECIMAL(10,2) DEFAULT 0,

    travel DECIMAL(10,2) DEFAULT 0,

    clg DECIMAL(10,2) DEFAULT 0,

    misc DECIMAL(10,2) DEFAULT 0,

    total DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);
SELECT * FROM users;
SELECT * FROM expenses;