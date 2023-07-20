import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";

const Diente = sequelize.define("Diente", {
  numero: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true,
  },
  posicionX: { type: Number, required: true },
  posicionY: { type: Number, required: true },
  caras: {
    type: DataTypes.JSONB,
    allowNull: false,
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
});

export default Diente;
