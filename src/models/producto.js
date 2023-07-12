import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";
import Consulta from "./consulta.js";

const Producto = sequelize.define(
  "producto",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lote: {
      type: DataTypes.STRING,
    },
    vencimiento: {
      type: DataTypes.DATEONLY,
      get() {
        const rawValue = this.getDataValue("vencimiento");
        if (rawValue) {
          const formattedDate = rawValue.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return formattedDate;
        }
        return null;
      },
    },
    stockMinimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Producto;
