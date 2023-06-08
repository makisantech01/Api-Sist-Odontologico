import Paciente from "../models/paciente.js";

export const getAllPacientes = async (req, res) => {
  const pacientes = await Paciente.findAll();
  response(res, 200, pacientes);
};
