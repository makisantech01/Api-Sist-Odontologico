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
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      set(value) {
        if (value) {
          const [dia, mes, anio] = value.split("/");
          const fechaSinConversion = new Date(anio, mes - 1, dia); // Restamos 1 al mes ya que los meses en JavaScript son base 0
          this.setDataValue("fechaNacimiento", fechaSinConversion);
        }
      },
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
      defaultValue: null,
      unique: true,
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
    ocupacion: {
      type: DataTypes.STRING,
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
    plan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    afiliado: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
