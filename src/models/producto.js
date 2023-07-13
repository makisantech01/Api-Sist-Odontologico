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

      set(value) {
        if (value) {
          const [dia, mes, anio] = value.split("/");
          const fechaSinConversion = new Date(anio, mes - 1, dia); // Restamos 1 al mes ya que los meses en JavaScript son base 0
          this.setDataValue("vencimiento", fechaSinConversion);
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
