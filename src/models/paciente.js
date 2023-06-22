import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";
import Consulta from "./consulta.js";
import Historial from "./historial.js";
import Odontograma from "./odontograma.js";

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
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    domicilio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nroHistoriaClinica: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    telefono1: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    telefono2: {
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

Paciente.hasMany(Odontograma, {
  foreignKey: "pacienteId",
  sourceKey: "dni",
});

Odontograma.belongsTo(Paciente, {
  foreignKey: "pacienteId",
  targetId: "dni",
});

export default Paciente;
