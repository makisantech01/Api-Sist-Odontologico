import Diente from "../models/diente.js"; // Asegúrate de proporcionar la ruta correcta a tu modelo
import sequelize from "../config/config.cjs"; // Asegúrate de proporcionar la ruta correcta a tu configuración de Sequelize


const initialDientes = [
    // Arriba a la izquierda
    { numero: 18, posicionX: 1, posicionY: 1 },
    { numero: 17, posicionX: 2, posicionY: 1 },
    { numero: 16, posicionX: 3, posicionY: 1 },
    { numero: 15, posicionX: 4, posicionY: 1 },
    { numero: 14, posicionX: 5, posicionY: 1 },
    { numero: 13, posicionX: 6, posicionY: 1 },
    { numero: 12, posicionX: 7, posicionY: 1 },
    { numero: 11, posicionX: 8, posicionY: 1 },
    
    // Arriba a la derecha
    { numero: 21, posicionX: 1, posicionY: 2 },
    { numero: 22, posicionX: 2, posicionY: 2 },
    { numero: 23, posicionX: 3, posicionY: 2 },
    { numero: 24, posicionX: 4, posicionY: 2 },
    { numero: 25, posicionX: 5, posicionY: 2 },
    { numero: 26, posicionX: 6, posicionY: 2 },
    { numero: 27, posicionX: 7, posicionY: 2 },
    { numero: 28, posicionX: 8, posicionY: 2 },
    
    // Abajo izquierda
    { numero: 48, posicionX: 1, posicionY: 3 },
    { numero: 47, posicionX: 2, posicionY: 3 },
    { numero: 46, posicionX: 3, posicionY: 3 },
    { numero: 45, posicionX: 4, posicionY: 3 },
    { numero: 44, posicionX: 5, posicionY: 3 },
    { numero: 43, posicionX: 6, posicionY: 3 },
    { numero: 42, posicionX: 7, posicionY: 3 },
    { numero: 41, posicionX: 8, posicionY: 3 },
    
    // Abajo derecha
    { numero: 31, posicionX: 1, posicionY: 4 },
    { numero: 32, posicionX: 2, posicionY: 4 },
    { numero: 33, posicionX: 3, posicionY: 4 },
    { numero: 34, posicionX: 4, posicionY: 4 },
    { numero: 35, posicionX: 5, posicionY: 4 },
    { numero: 36, posicionX: 6, posicionY: 4 },
    { numero: 37, posicionX: 7, posicionY: 4 },
    { numero: 38, posicionX: 8, posicionY: 4 },
  ];

const initializeData = async () => {
  // Verificar si ya hay registros en la base de datos
  const existingDientes = await Diente.findAll();

  // Si no hay registros, inicializar los datos
  if (existingDientes.length === 0) {
    try {
      await sequelize.sync({ force: true }); // Esto eliminará y recreará la tabla en cada inicio
      await Diente.bulkCreate(initialDientes);
      console.log("Datos inicializados correctamente.");
    } catch (error) {
      console.error("Error al inicializar los datos:", error);
    }
  }
};

export default initializeData;
