import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";

const Diente = sequelize.define("Diente", {
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  posicionX: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  posicionY: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  caras: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      vestibular: null,
      lingual: null,
      oclusal: null,
      incisal: null,
      mesial: null,
      distal: null,
      cervical: null,
    },
  },
  todoElDiente: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  },
  observacion: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
});

export default Diente;
