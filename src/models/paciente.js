import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";
import Consulta from "./consulta.js";
import Historial from "./historial.js";

const Paciente = sequelize.define(
  "paciente",
  {
    dni: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Debe proporcionar una dirección de correo electrónico válida.",
        },
      },
    },
    telefono: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    obraSocial: {
      type: DataTypes.ENUM,
      values: ["Particular", "OSDE", "Medifé", "Swiss Medical", "GALENO"],
    },
  },
  {
    timestamps: false,
  }
);

Paciente.hasMany(Consulta, {
  foreignKey: "pacienteId",
  sourceKey: "dni",
});

Consulta.belongsTo(Paciente, {
  foreignKey: "pacienteId",
  targetId: "dni",
});

Paciente.hasOne(Historial, {
  foreignKey: "pacienteId",
  sourceKey: "dni",
});

Historial.belongsTo(Paciente, {
  foreignKey: "pacienteId",
  targetId: "dni",
});

export default Paciente;
