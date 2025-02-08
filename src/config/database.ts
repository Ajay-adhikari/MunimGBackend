import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE as string,  // Updated variable names
  process.env.MYSQLUSER as string,
  process.env.MYSQLPASSWORD as string,
  {
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),  // Convert port to number
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
