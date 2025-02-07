// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'munimg',
//   process.env.DB_USER || 'root',
//   process.env.DB_PASSWORD || '381873',
//   {
//     host: process.env.DB_HOST || 'localhost',
//     dialect: 'mysql',
//     logging: false,
//   }
// );
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || 'munimg',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '381873',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306,  // Ensure correct port
    logging: false,
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
})();

export default sequelize;
