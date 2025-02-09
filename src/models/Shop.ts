import sequelize from '../config/database';  // Assuming sequelize instance

const createShopsTable = async () => {
    try {
        // Check if the Users table exists, and create it if it doesn't
        const result = await sequelize.query(`
     CREATE TABLE IF NOT EXISTS Shops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description varchar(255)  default null,
    FOREIGN KEY (userId) REFERENCES Users(id)
    );
    `);
    } catch (error) {
        console.error('Error creating Shops table:', error);
    }
};

// Run the migration once to create the table
createShopsTable();
