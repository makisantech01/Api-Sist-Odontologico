import response from "../utils/response.js";
import Consulta from "../models/consulta.js";
import Paciente from "../models/paciente.js";
import Odontograma from "../models/odontograma.js";
import Producto from "../models/producto.js";

export const getAllConsultas = async (req, res) => {
  const consultas = await Consulta.findAll({
    include: [{ model: Paciente }, { model: Odontograma }, { model: Producto }],
  });
  response(res, 200, consultas);
};

export const getConsulta = async (req, res) => {
  const { id } = req.params;
  const consulta = await Consulta.findByPk(id, {
    include: [{ model: Paciente }, { model: Odontograma }, { model: Producto }],
  });
  response(res, 200, consulta);
};

export const createConsulta = async (req, res) => {
  const { dni } = req.params;
  const { productos, ...consultaData } = req.body;
  const currentPaciente = await Paciente.findByPk(dni);
  const newConsulta = await Consulta.create(consultaData);
  await currentPaciente?.addConsulta(newConsulta);
  for (const producto of productos) {
    const { id, cantidad } = producto;

    // Buscar el producto en la base de datos
    const productoExistente = await Producto.findByPk(id);

    if (productoExistente) {
      // Actualizar el stock del producto restando la cantidad utilizada
      productoExistente.cantidad -= cantidad;
      await productoExistente.save();
    }
  }
  response(res, 200, newConsulta);
};

export const updateConsulta = async (req, res) => {
  const { id } = req.params;
  const consulta = await Consulta.findByPk(id);
  const updatedConsulta = await consulta?.update(req.body);
  response(res, 201, updatedConsulta);
};

export const deleteConsulta = async (req, res) => {
  const { id } = req.params;
  const consulta = await Consulta.findByPk(id);
  await consulta.destroy();
  response(res, 200, `Consulta ID: ${id} eliminada!`);
};
