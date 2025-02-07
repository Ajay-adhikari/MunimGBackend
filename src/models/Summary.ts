import sequelize from '../config/database';  // Assuming sequelize instance

const createSummaryTable = async () => {
    try {
        // Check if the Users table exists, and create it if it doesn't
        const result = await sequelize.query(`
     CREATE TABLE IF NOT EXISTS Summary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shop_id INT,
    total_sales DECIMAL(10, 2) DEFAULT 0,
    total_expenses DECIMAL(10, 2) DEFAULT 0,
    net_profit DECIMAL(10, 2) DEFAULT 0,  -- Calculated as total_sales - total_expenses
    date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (shop_id) REFERENCES Shops(id)
);

    `);
    } catch (error) {
        console.error('Error creating Summary table:', error);
    }
};

// Run the migration once to create the table
createSummaryTable();
