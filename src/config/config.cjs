const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env"), // Ruta relativa del archivo .env
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  }
);

module.exports = sequelize;
