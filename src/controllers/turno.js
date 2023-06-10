import response from "../utils/response.js";
import Turno from "../models/turno.js";

export const getAllTurnos = async (req, res) => {
  const turno = await Turno.findAll();
  response(res, 200, turno);
};

export const getTurno = async (req, res) => {
  const { id } = req.params;
  const turno = await Turno.findByPk(id);
  response(res, 200, turno);
};

export const createTurno = async (req, res) => {
  const newTurno = await Turno.create(req.body);
  response(res, 200, newTurno);
};

export const updateTurno = async (req, res) => {
  const { id } = req.params;
  const turno = await Turno.findByPk(id);
  const updatedTurno = await turno.update(req.body);
  response(res, 201, updatedTurno);
};

export const deleteTurno = async (req, res) => {
  const { id } = req.params;
  const turno = await Turno.findByPk(id);
  await turno.destroy();
  response(res, 200, `Turno Id: ${id} eliminado!`);
};
