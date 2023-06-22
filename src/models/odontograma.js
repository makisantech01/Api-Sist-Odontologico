import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";

const Odontograma = sequelize.define("odontograma", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  datos: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
  },
});

export default Odontograma;
