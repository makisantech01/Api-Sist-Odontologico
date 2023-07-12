import response from "../utils/response.js";
import Paciente from "../models/paciente.js";
import Historial from "../models/historial.js";
import Consulta from "../models/consulta.js";
import Usuario from "../models/usuario.js";
import moment from "moment";

export const getAllPacientes = async (req, res) => {
  const pacientes = await Paciente.findAll();

  const pacientesFormateados = pacientes.map((paciente) => {
    const fechaOriginal = new Date(paciente.fechaNacimiento);
    const fechaFormateada = `${fechaOriginal
      .getUTCDate()
      .toString()
      .padStart(2, "0")}/${(fechaOriginal.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}/${fechaOriginal.getUTCFullYear()}`;
    return { ...paciente.toJSON(), fechaNacimiento: fechaFormateada };
  });
  response(res, 200, pacientesFormateados);
};

export const getPaciente = async (req, res) => {
  const { dni } = req.params;
  const paciente = await Paciente.findByPk(dni, {
    include: [{ model: Historial }, { model: Consulta }],
  });

  !paciente
    ? response(res, 404, { message: "Paciente no encontrado!" })
    : response(res, 200, paciente);
};

export const createPaciente = async (req, res) => {
  const { id } = req.params;
  const currentUsuario = await Usuario.findByPk(id);
  const newPaciente = await Paciente.create(req.body);
  await currentUsuario?.setPaciente(newPaciente);
  response(res, 200, newPaciente);
};

export const updatePaciente = async (req, res) => {
  const { dni } = req.params;
  const paciente = await Paciente.findByPk(dni);
  const updatedPaciente = await paciente?.update(req.body);
  response(res, 201, updatedPaciente);
};

export const deletePaciente = async (req, res) => {
  const { dni } = req.params;
  const paciente = await Paciente.findByPk(dni);
  await paciente.destroy();
  response(res, 200, `Paciente DNI: ${dni} eliminado!`);
};
