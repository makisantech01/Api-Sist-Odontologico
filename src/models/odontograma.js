import { DataTypes } from "sequelize"
import sequelize from "../config/config.cjs"
import Diente from "./diente.js"

const Odontograma = sequelize.define(
	"odontograma",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		fecha: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		timestamps: false,
	}
)

//DIENTES
Odontograma.hasMany(Diente, { foreignKey: "odontogramaId" })
Diente.belongsTo(Odontograma, { foreignKey: "odontogramaId" })

export default Odontograma
