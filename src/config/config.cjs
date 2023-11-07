const Sequelize = require("sequelize")
require("dotenv").config()
const path = require("path")

const { EXTERNAL_DB, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_NAME, NODE_ENV } = process.env

let connectionConfig =
	NODE_ENV === "local"
		? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
		: EXTERNAL_DB

const sequelize = new Sequelize(
	connectionConfig,
	{
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
		// dialectOptions: {
		// 	ssl: {
		// 		require: true,
		// 	},
		// },
		dialect: "postgres",
	}
)

module.exports = sequelize
