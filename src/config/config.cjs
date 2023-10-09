const Sequelize = require("sequelize")
require("dotenv").config()
const path = require("path")

const {EXTERNAL_DB} = process.env

const sequelize = new Sequelize(
	// process.env.DB_NAME,
	// process.env.DB_USER,
	// process.env.DB_PASSWORD,
	EXTERNAL_DB,
	// {
	// 	host: process.env.DB_HOST,
	// 	port: process.env.DB_PORT,
	// 	dialect: "postgres",
	// }
  {
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
		dialectOptions: {
			ssl: {
				require: true,
			},
		},
	}
)

module.exports = sequelize