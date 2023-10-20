import { DataTypes } from "sequelize"
import sequelize from "../config/config.cjs"

const Diente = sequelize.define(
	"diente",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		texto: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.ENUM,
			values: ["white", "gray", "green", "red", "blue", "yellow", "purple"],
			allowNull: true,
			defaultValue: "white",
		},
	},
	{
		timestamps: false,
	}
)

export default Diente

// {
// 	name: "restaurado",
// 	color: "gray",
// },
// {
// 	name: "cariado",
// 	color: "green",
// },
// {
// 	name: "restaurado",
// 	color: "red",
// },
// {
// 	name: "higido",
// 	color: "blue",
// },
// {
// 	name: "corona",
// 	color: "yellow",
// },
// {
// 	name: "implantedental",
// 	color: "purple",
// },
