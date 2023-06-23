import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/config.cjs";
import Odontograma from "./odontograma.js";

const Consulta = sequelize.define(
  "consulta",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    prestacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zona: {
      type: DataTypes.ENUM,
      values: ["Vestibular", "Paladar", "Mencial", "Distal"],
      allowNull: false,
    },
    caras: {
      type: DataTypes.ENUM,
      values: ["V", "M", "P", "L", "O", "I", "D", "G"],
      allowNull: false,
    },
    sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Consulta.beforeCreate((instance, options) => {
  instance.fecha = new Date();
});

Consulta.hasOne(Odontograma, {
  foreignKey: "consultaId",
  sourceKey: "id",
});

Odontograma.belongsTo(Consulta, {
  foreignKey: "consultaId",
  targetId: "id",
});

export default Consulta;
