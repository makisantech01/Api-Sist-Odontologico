import response from "../utils/response.js";
import Consulta from "../models/consulta.js";
import Paciente from "../models/paciente.js";
import Odontograma from "../models/odontograma.js";

export const getAllConsultas = async (req, res) => {
  const consultas = await Consulta.findAll();
  response(res, 200, consultas);
};

export const getConsulta = async (req, res) => {
  const { id } = req.params;
  const consulta = await Consulta.findByPk(id, {
    include: [{ model: Odontograma }],
  });
  response(res, 200, consulta);
};

export const createConsulta = async (req, res) => {
  const { dni } = req.params;
  const currentPaciente = await Paciente.findByPk(dni);
  const newConsulta = await Consulta.create(req.body);
  await currentPaciente?.addConsulta(newConsulta);
  response(res, 200, newConsulta);
};

export const updateConsulta = async (req, res) => {
  const { id } = req.params;
  const consulta = await Consulta.findByPk(id);
  const updatedConsulta = await consulta.update(req.body);
  response(res, 201, updatedConsulta);
};

export const deleteConsulta = async (req, res) => {
  const { id } = req.params;
  const consulta = await Consulta.findByPk(id);
  await consulta.destroy();
  response(res, 200, `Consulta ID: ${id} eliminada!`);
};
