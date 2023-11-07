import response from "../utils/response.js"
import Diente from "../models/diente.js"
import { createDienteController, deleteDienteController } from "../controllers/diente.js"

export const getAllDientes = async (req, res) => {
		const dientes = await Diente.findAll()
		response(res, 200, dientes)
}

export const getDienteById = async (req, res) => {
	const { id } = req.params
	const diente = await getDienteById(id)
	response(res, 200, diente)
}

export const createDiente = async (req, res) => {
	const { odontogramaId } = req.params
	const diente = await createDienteController(odontogramaId)
	response(res, 200, diente)
}

export const updateDiente = async (req, res) => {
	const { id } = req.params
	const { face: faceNumber, color } = req.query
	await updateDiente(id, faceNumber, color)
	response(res, 200, `Diente con id ${id} editado con éxito (face: ${face}, color: ${color})`)
}

export const deleteDiente = async (req, res) => {
	const { id } = req.params
	await deleteDienteController(id)
	response(res, 200, "Diente eliminado correctamente")
}

export default {
	getAllDientes,
	getDienteById,
	createDiente,
	updateDiente,
	deleteDiente,
}
