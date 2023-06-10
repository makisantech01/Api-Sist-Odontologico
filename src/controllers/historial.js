import response from "../utils/response.js";
import Historial from "../models/historial.js";

export const getAllHistoriales = async (req, res) => {
  const historiales = await Historial.findAll();
  response(res, 200, historiales);
};

export const getHistorial = async (req, res) => {
  const { id } = req.params;
  const historial = await Historial.findByPk(id);
  response(res, 200, historial);
};

export const createHistorial = async (req, res) => {
  const newHistorial = await Historial.create(req.body);
  response(res, 200, newHistorial);
};

export const updateHistorial = async (req, res) => {
  const { id } = req.params;
  const historial = await Historial.findByPk(id);
  const updatedHistorial = await historial.update(req.body);
  response(res, 201, updatedHistorial);
};

export const deleteHistorial = async (req, res) => {
  const { id } = req.params;
  const historial = await Historial.findByPk(id);
  await historial.destroy();
  response(res, 200, `Historial ID: ${id} eliminado!`);
};
