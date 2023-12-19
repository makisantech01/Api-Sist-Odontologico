import response from "../utils/response.js";
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
	const { dni, password, admin, superUserPassword } = req.body;
	if (!dni || !password) {
		throw new Error('Faltan datos necesarios')
	}
	const newUser = await createUsuarioController(dni, password, admin, superUserPassword)
	response(res, 200, newUser);
};

export const updateUsuario = async (req, res) => {
	const { dni: id } = req.params;
	const { dni, password, admin } = req.body;
	const { admin: currentUserAdminRole } = req.user

	if (!currentUserAdminRole && admin) {
		throw new Error('Acceso denegado, requiere permisos de administrador')
	}
	if (!dni || !password) {
		throw new Error('Faltan datos necesarios')
	}

	const updatedUsuario = await updateUsuarioController(id, dni, password, admin)
	response(res, 201, updatedUsuario);
};

export const deleteUsuario = async (req, res) => {
	const { dni } = req.params;
	if (!dni) throw new Error('DNI no especificado')
	await deleteUsuarioController(dni);
	response(res, 200, `Usuario DNI: ${dni} eliminado!`);
};