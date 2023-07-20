import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";
// import Diente from "./diente.js";

const Odontograma = sequelize.define("Odontograma", {
  paciente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // materialesUsados: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // }
});

// Odontograma.hasMany(Diente, { as: "dientes" });

export default Odontograma;
