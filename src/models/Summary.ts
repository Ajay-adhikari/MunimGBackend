import sequelize from '../config/database';  // Assuming sequelize instance

const createSummaryTable = async () => {
    try {
        // Check if the Users table exists, and create it if it doesn't
        const result = await sequelize.query(`
     CREATE TABLE IF NOT EXISTS Summary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shopId INT,
    totalSale DECIMAL(10, 2) DEFAULT 0,
    totalExpense DECIMAL(10, 2) DEFAULT 0,
    netProfit DECIMAL(10, 2) DEFAULT 0,  -- Calculated as total_sales - total_expenses
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (shopId) REFERENCES Shops(id)
);

    `);
    } catch (error) {
        console.error('Error creating Summary table:', error);
    }
};

// Run the migration once to create the table
createSummaryTable();
