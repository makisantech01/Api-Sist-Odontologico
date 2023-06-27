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

Consulta.hasMany(Producto, {
  foreignKey: "consultaId",
  sourceKey: "id",
});

Producto.belongsToMany(Consulta, {
  foreignKey: "consultaId",
  through: "productos_utilizados",
  targetId: "id",
});

export default Producto;
