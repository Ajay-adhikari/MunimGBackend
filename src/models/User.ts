import sequelize from '../config/database';  // Assuming sequelize instance

const createUsersTable = async () => {
  try {
    // Check if the Users table exists, and create it if it doesn't
    const result = await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(15) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error('Error creating Users table:', error);
  }
};

// Run the migration once to create the table
createUsersTable();
