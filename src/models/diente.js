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
	},
	{
		timestamps: false,
	}
)

export default Diente
