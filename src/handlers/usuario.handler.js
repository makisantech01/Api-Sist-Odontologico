import response from "../utils/response.js";
import Paciente from "../models/paciente.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";
import { createUsuarioController, deleteUsuarioController, getAllUsuariosController, getUsuarioController, updateUsuarioController } from "../controllers/usuario.js";

export const getAllUsuarios = async (req, res) => {
	try {
		const usuarios = await getAllUsuariosController()
		response(res, 200, usuarios);
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al solicitar el usuario')
	}
};

export const getUsuario = async (req, res) => {
	const { dni } = req.params;
	try {
		if (!dni) throw new Error('DNI no especificado')
		const usuario = await getUsuarioController(dni)
		usuario
			? response(res, 200, usuario)
			: response(res, 404, 'Usuario no econtrado')
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al solicitar el usuario')
	}
};

export const createUsuario = async (req, res) => {
	const { dni, password, admin } = req.body;
	if (!dni || !password || admin === null) {
		throw new Error('Faltan datos necesarios')
	}
	try {
		const newUser = await createUsuarioController(dni, password, admin)
		response(res, 200, newUser);
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al crear un usuario')
	}
};

export const updateUsuario = async (req, res) => {
	const { id } = req.params;
	const { dni, password } = req.body;
	try {
		const updatedUsuario = await updateUsuarioController(id, dni, password)
		response(res, 201, updatedUsuario);
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al actualizar usuario')
	}
};

export const deleteUsuario = async (req, res) => {
	const { dni } = req.params;
	try {
		await deleteUsuarioController(dni);
		response(res, 200, `Usuario DNI: ${dni} eliminado!`);
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al borrar usuario')
	}
};
