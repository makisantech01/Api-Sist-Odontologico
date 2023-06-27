import response from "../utils/response.js";
import Paciente from "../models/paciente.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

export const getAllUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  response(res, 200, usuarios);
};

export const getUsuario = async (req, res) => {
  const { dni } = req.params;
  const usuario = await Usuario.findByPk(dni, {
    include: [{ model: Paciente }],
  });
  !usuario
    ? response(res, 404, { message: "Usuario no encontrado!" })
    : response(res, 200, usuario);
};

export const createUsuario = async (req, res) => {
  const { dni, password, admin } = req.body;
  // Generar un hash de la contraseña antes de almacenarla
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUsuario = await Usuario.create({
    dni,
    password: hashedPassword,
    admin,
  });
  response(res, 200, newUsuario);
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { dni, password } = req.body;
  const usuario = await Usuario.findByPk(id);
  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUsuario = await usuario?.update({
    dni,
    password: hashedPassword,
  });
  response(res, 201, updatedUsuario);
};

export const deleteUsuario = async (req, res) => {
  const { dni } = req.params;
  const usuario = await Usuario.findByPk(dni);
  await usuario.destroy();
  response(res, 200, `Usuario DNI: ${dni} eliminado!`);
};
