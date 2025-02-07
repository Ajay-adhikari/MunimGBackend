import sequelize from '../config/database';  // Assuming sequelize instance

const createSalesTable = async () => {
    try {
        // Check if the Users table exists, and create it if it doesn't
        const result = await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shopId INT,
    productId INT,
    quantity INT NOT NULL,  -- Quantity of the product sold
    amount DECIMAL(10, 2) NOT NULL,  -- Total amount for this sale
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shopId) REFERENCES Shops(id),
    FOREIGN KEY (productId) REFERENCES Inventory(id)
);
    `);
    } catch (error) {
        console.error('Error creating Sales table:', error);
    }
};

// Run the migration once to create the table
createSalesTable();
