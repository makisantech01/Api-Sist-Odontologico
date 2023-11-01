import { DataTypes } from "sequelize"
import sequelize from "../config/config.cjs"
import Diente from "./diente.js"
import Observacion from "./observacion.js"

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

//OBSERVACIONES
Odontograma.hasMany(Observacion, { foreignKey: "odontogramaId", as: 'observaciones' })
Observacion.belongsTo(Odontograma, { foreignKey: "odontogramaId", as: 'observaciones' })

export default Odontograma
