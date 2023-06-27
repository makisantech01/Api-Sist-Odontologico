import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";
import Paciente from "./paciente.js";

const Usuario = sequelize.define(
  "usuario",
  {
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

Usuario.hasOne(Paciente, {
  foreignKey: "usuarioId",
  sourceKey: "dni",
});

Paciente.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  targetId: "dni",
});

export default Usuario;
