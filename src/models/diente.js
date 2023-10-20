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
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		face1: {
			type: DataTypes.ENUM,
			values: ["white", "gray", "green", "red", "blue", "yellow", "purple"],
			allowNull: true,
			defaultValue: "white",
		},
		face2: {
			type: DataTypes.ENUM,
			values: ["white", "gray", "green", "red", "blue", "yellow", "purple"],
			allowNull: true,
			defaultValue: "white",
		},
		face3: {
			type: DataTypes.ENUM,
			values: ["white", "gray", "green", "red", "blue", "yellow", "purple"],
			allowNull: true,
			defaultValue: "white",
		},
		face4: {
			type: DataTypes.ENUM,
			values: ["white", "gray", "green", "red", "blue", "yellow", "purple"],
			allowNull: true,
			defaultValue: "white",
		},
		face5: {
			type: DataTypes.ENUM,
			values: ["white", "gray", "green", "red", "blue", "yellow", "purple"],
			allowNull: true,
			defaultValue: "white",
		},
		face6: {
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