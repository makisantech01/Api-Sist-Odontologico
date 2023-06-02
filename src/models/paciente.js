import { DataTypes, Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    // static associate(models) {
    //     Paciente.belongsToMany(models.Historial, {
    //         through: 'HistorialPaciente'
    //       })
    // }
  }

  Paciente.init(
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
      sequelize,
      modelName: "Paciente",
    }
  );
};
