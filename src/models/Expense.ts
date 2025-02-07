import sequelize from '../config/database';  // Assuming sequelize instance

const createInvetoryTable = async () => {
    try {
        // Check if the Users table exists, and create it if it doesn't
        const result = await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shopId INT,
    amount DECIMAL(10, 2) NOT NULL,  -- Amount spent on the expense
    description TEXT,  -- Description of the expense
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(255),  -- Category of the expense
    paymentMode VARCHAR(255),  -- Payment mode used for the expense
    paidTo VARCHAR(255),  -- Who the expense was paid to
    FOREIGN KEY (shopId) REFERENCES Shops(id)
);
    `);
    } catch (error) {
        console.error('Error creating Expense table:', error);
    }
};

// Run the migration once to create the table
createInvetoryTable();
