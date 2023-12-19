import Paciente from "../models/paciente.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

const { ADMIN_PASWORD } = process.env

export const getAllUsuariosController = async () => {
  const usuarios = await Usuario.findAll();
  return usuarios
};

export const getUsuarioController = async (dni) => {
  const usuario = await Usuario.findByPk(dni, {
    include: [{ model: Paciente }],
  });
  return usuario
};

export const createUsuarioController = async (dni, password, admin = false, superUserPassword) => {

  console.log(dni, admin, superUserPassword)

  if (admin && superUserPassword !== ADMIN_PASWORD) {
    throw new Error('No se concede permiso para crear un administrador')
  }

  // Generar un hash de la contraseña antes de almacenarla
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUsuario = await Usuario.create({
    dni,
    password: hashedPassword,
    admin,
  });
  return newUsuario
};

export const updateUsuarioController = async (id, dni, password, admin) => {
  const usuario = await Usuario.findByPk(id);
  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUsuario = await usuario?.update({
    dni,
    password: hashedPassword,
    admin
  });
  return updatedUsuario
};

export const deleteUsuarioController = async (dni) => {
  const usuario = await Usuario.findByPk(dni);
  await usuario.destroy();
};
