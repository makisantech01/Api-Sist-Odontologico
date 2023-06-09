import { response } from "express";
import Paciente from "../models/paciente.js";

export const getAllPacientes = async (req, res) => {
  const pacientes = await Paciente.findAll();
  response(res, 200, pacientes);
};

export const getPaciente = async (req, res) => {
  const { dni } = req.params;
  const paciente = await Paciente.findByPk(dni);
  response(res, 200, paciente);
};

export const createPaciente = async (req, res) => {
  const newPaciente = await Paciente.create(req.body);
  response(res, 200, newPaciente);
};

export const updatePaciente = async (req, res) => {
  const { dni } = req.params;
  const paciente = await Paciente.findByPk(dni);
  const updatedPaciente = await paciente.update(req.body);
  response(res, 201, updatedPaciente);
};

export const deletePaciente = async (req, res) => {
  const { dni } = req.params;
  const paciente = await Paciente.findByPk(dni);
  await paciente.destroy();
  response(res, 200, `Paciente DNI: ${dni} eliminado!`);
};
