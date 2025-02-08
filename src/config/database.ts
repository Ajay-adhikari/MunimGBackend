import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { string } from "zod";

// Load environment variables

dotenv.config();

require("dotenv").config();

const sequelize = new Sequelize(String(process.env.DATABASE_URL), {
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("Connection error:", err));

export default sequelize;