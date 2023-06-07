import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";

const Consulta = sequelize.define(
  "consulta",
  {
    fecha: {
      type: DataTypes.DATE,
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
    },
  },
  {
    timestamps: false,
  }
);

Consulta.beforeCreate((instance, options) => {
  instance.fecha = new Date();
});

export default Consulta;
