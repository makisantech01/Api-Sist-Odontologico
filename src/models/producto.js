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
        const fecha = new Date(this.getDataValue("vencimiento"));
        if (fecha instanceof Date && !isNaN(fecha)) {
          const [anio, mes, dia] = fecha.toISOString().split("T")[0].split("-");
          return `${dia}/${mes}/${anio}`;
        }
        return null;
      },
      set(value) {
        if (value) {
          const [dia, mes, anio] = value.split("/");
          this.setDataValue("vencimiento", new Date(`${anio}-${mes}-${dia}`));
        }
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
