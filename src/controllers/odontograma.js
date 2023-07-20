import response from "../utils/response.js";
import Odontograma from "../models/odontograma.js";
import Diente from "../models/diente.js";
import Consulta from "../models/consulta.js";

export const getAllOdontogramas = async (req, res) => {
  const odontograma = await Odontograma.findAll();
  response(res, 200, odontograma);
};

export const getOdontograma = async (req, res) => {
  const { id } = req.params;
  const odontograma = await Odontograma.findByPk(id);
  !odontograma
    ? response(res, 404, { message: "Odontograma no encontrado!" })
    : response(res, 200, odontograma);
};

export const createOdontograma = async (req, res) => {
  const { id } = req.params;
  const currentConsulta = await Consulta.findByPk(id);
  const newOdontograma = await Odontograma.create(req.body);
  await currentConsulta?.setOdontograma(newOdontograma);
  response(res, 200, newOdontograma);
};

export const updateOdontograma = async (req, res) => {
  const { id } = req.params;
  const odontograma = await Odontograma.findByPk(id);
  const updatedOdontograma = await odontograma?.update(req.body);
  response(res, 201, updatedOdontograma);
};

export const deleteOdontograma = async (req, res) => {
  const { id } = req.params;
  const odontograma = await Odontograma.findByPk(id);
  await odontograma.destroy();
  response(res, 200, `Odontograma DNI: ${id} eliminado!`);
};

export const getAllDientes = async (req, res) => {
  try {
    const dientes = await Diente.findAll();
    res.json(dientes);
  } catch (error) {
    console.error("Error al obtener los dientes del odontograma:", error);
    res
      .status(500)
      .json({
        error: "Ocurrió un error al obtener los dientes del odontograma",
      });
  }
};

// Obtener un diente por su ID
export const getDienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const diente = await Diente.findByPk(id);
    if (!diente) {
      return res.status(404).json({ error: "Diente no encontrado" });
    }
    res.json(diente);
  } catch (error) {
    console.error("Error al obtener el diente:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener el diente" });
  }
};

// Crear un nuevo diente
export const createDiente = async (req, res) => {
  const { numero, caras, todoElDiente, observacion } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!numero || !caras || !todoElDiente || !observacion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Crear el diente en la base de datos
    const diente = await Diente.create({
      numero,
      caras,
      todoElDiente,
      observacion,
    });

    res.status(201).json(diente);
  } catch (error) {
    console.error("Error al crear el diente:", error);
    res.status(500).json({ error: "Ocurrió un error al crear el diente" });
  }
};

// Actualizar un diente por su ID
export const updateDiente = async (req, res) => {
  const { id } = req.params;
  const { numero, caras, todoElDiente, observacion } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!numero || !caras || !todoElDiente || !observacion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Buscar el diente en la base de datos y actualizarlo
    const diente = await Diente.findByPk(id);
    if (!diente) {
      return res.status(404).json({ error: "Diente no encontrado" });
    }

    diente.numero = numero;
    diente.caras = caras;
    diente.todoElDiente = todoElDiente;
    diente.observacion = observacion;
    await diente.save();

    res.json(diente);
  } catch (error) {
    console.error("Error al actualizar el diente:", error);
    res.status(500).json({ error: "Ocurrió un error al actualizar el diente" });
  }
};

// Eliminar un diente por su ID
export const deleteDiente = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el diente en la base de datos y eliminarlo
    const diente = await Diente.findByPk(id);
    if (!diente) {
      return res.status(404).json({ error: "Diente no encontrado" });
    }

    await diente.destroy();

    res.json({ message: "Diente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el diente:", error);
    res.status(500).json({ error: "Ocurrió un error al eliminar el diente" });
  }
};
