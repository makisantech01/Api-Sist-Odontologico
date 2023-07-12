import { DataTypes } from "sequelize";
import sequelize from "../config/config.cjs";

const Historial = sequelize.define(
  "historial",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        const rawValue = this.getDataValue("fecha");
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
    enfermedad: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detalleEnfermedad: {
      type: DataTypes.STRING,
    },
    tratamientoMedico: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detalleTratamiento: {
      type: DataTypes.STRING,
    },
    medicacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detalleMedicacion: {
      type: DataTypes.STRING,
    },
    alergia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detalleAlergia: {
      type: DataTypes.STRING,
    },
    cicatrizacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    fiebreReumatica: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    diabetes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    problemasCardiacos: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    aspirinas: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    anticoagulante: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    tabaquismo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    embarazo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    mesesEmbarazo: {
      type: DataTypes.INTEGER,
    },
    hipertension: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    hipotension: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    problemasRenales: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    problemasGastricos: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detalleGastricos: {
      type: DataTypes.STRING,
    },
    convulsiones: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    epilepsia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    sifilisGonorreaHIV: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    operacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detalleOperacion: {
      type: DataTypes.STRING,
    },
    problemasRespiratorios: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detalleRespiratorios: {
      type: DataTypes.STRING,
    },
    tiroides: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detalleTiroides: {
      type: DataTypes.STRING,
    },
    otros: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    detalleOtros: {
      type: DataTypes.STRING,
    },
    consentimiento: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

Historial.beforeCreate((instance, options) => {
  instance.fecha = new Date();
});

export default Historial;
