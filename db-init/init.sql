-- Path: db-init/init.sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL, -- Requirement: 20-60 chars
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Requirement: 8-16 chars, 1 Upper, 1 Special
    address VARCHAR(400) NOT NULL, -- Requirement: Max 400 chars
    role ENUM('Normal User', 'System Administrator', 'Store Owner') DEFAULT 'Normal User',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(400) NOT NULL,
    ownerId INT,
    overallRating DECIMAL(3, 2) DEFAULT 0.0,
    FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed an Initial Admin User (Password should be hashed in a real scenario)
INSERT INTO users (name, email, password, address, role) 
VALUES ('System Administrator', 'admin@storesphere.com', 'Admin@123', 'Headquarters, Tech City', 'System Administrator');