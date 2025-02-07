import sequelize from '../config/database';  // Assuming sequelize instance

const createInvetoryTable = async () => {
    try {
        // Check if the Users table exists, and create it if it doesn't
        const result = await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Inventory (
    id INT  PRIMARY KEY,
    shopId INT,
    name VARCHAR(255) NOT NULL,
    sellingPrice DECIMAL(10, 2) NOT NULL,
    costtPrice DECIMAL(10, 2) NOT NULL,
    margin DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (shop_id) REFERENCES Shops(id)
);
    `);
    } catch (error) {
        console.error('Error creating Inventory table:', error);
    }
};

// Run the migration once to create the table
createInvetoryTable();
