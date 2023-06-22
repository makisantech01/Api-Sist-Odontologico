import response from "../utils/response.js";
import Odontograma from "../models/paciente.js";

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
  const newOdontograma = await Odontograma.create(req.body);
  response(res, 200, newOdontograma);
};

export const updateOdontograma = async (req, res) => {
  const { id } = req.params;
  const odontograma = await Odontograma.findByPk(id);
  const updatedOdontograma = await odontograma.update(req.body);
  response(res, 201, updatedOdontograma);
};

export const deleteOdontograma = async (req, res) => {
  const { id } = req.params;
  const odontograma = await Odontograma.findByPk(id);
  await odontograma.destroy();
  response(res, 200, `Odontograma DNI: ${id} eliminado!`);
};
