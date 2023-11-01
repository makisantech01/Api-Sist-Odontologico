import { DataTypes } from "sequelize"
import sequelize from "../config/config.cjs"

const Observacion = sequelize.define(
	"observacion",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT('medium'),
			allowNull: false
		}
	},
	{
		tableName: 'observaciones',
		timestamps: false,
	},
)

export default Observacion
