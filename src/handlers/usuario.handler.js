import response from "../utils/response.js";
import Paciente from "../models/paciente.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";
import { createUsuarioController, deleteUsuarioController, getAllUsuariosController, getUsuarioController, updateUsuarioController } from "../controllers/usuario.js";

export const getAllUsuarios = async (req, res) => {
	const usuarios = await getAllUsuariosController()
	response(res, 200, usuarios)
}

export const getUsuario = async (req, res) => {
	const { dni } = req.params;
	if (!dni) throw new Error('DNI no especificado')
	const usuario = await getUsuarioController(dni)
	response(res, 200, usuario)
};

export const createUsuario = async (req, res) => {
	const { dni, password, admin } = req.body;
	if (!dni || !password || admin === null) {
		throw new Error('Faltan datos necesarios')
	}
	const newUser = await createUsuarioController(dni, password, admin)
	response(res, 200, newUser);
};

export const updateUsuario = async (req, res) => {
	const { id } = req.params;
	const { dni, password } = req.body;
	if (!dni || !password || admin === null) {
		throw new Error('Faltan datos necesarios')
	}
	const updatedUsuario = await updateUsuarioController(id, dni, password)
	response(res, 201, updatedUsuario);
};

export const deleteUsuario = async (req, res) => {
	const { dni } = req.params;
	if (!dni) throw new Error('DNI no especificado')
	await deleteUsuarioController(dni);
	response(res, 200, `Usuario DNI: ${dni} eliminado!`);
};