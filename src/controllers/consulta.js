import { response } from "express";
import Consulta from "../models/consulta.js";

export const getAllConsultas = async (req, res) => {
  const consultas = await Consulta.findAll();
  response(res, 200, consultas);
};

export const getConsulta = async (req, res) => {
  const { id } = req.params;
  const consulta = await Consulta.findByPk(id);
  response(res, 200, consulta);
};

export const createConsulta = async (req, res) => {
  const newConsulta = await Consulta.create(req.body);
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
  response(res, 200, `Paciente DNI: ${id} eliminado!`);
};
