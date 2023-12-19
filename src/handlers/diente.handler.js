import response from "../utils/response.js"
import Diente from "../models/diente.js"
import { createDienteController, deleteDienteController, getDienteByIdController, updateDienteController } from "../controllers/diente.js"

export const getAllDientes = async (req, res) => {
	const dientes = await Diente.findAll()
	response(res, 200, dientes)
}

export const getDienteById = async (req, res) => {
	const { id } = req.params
	const DBresponse = await getDienteByIdController(id)
	const { id: userId } = req.user
	const { userIdResource } = DBresponse

	if (userId !== userIdResource) {
		throw new Error("Identity mismatch with resource owner")
	}

	return response(res, 200, DBresponse.diente)
}

export const createDiente = async (req, res) => {
	const { odontogramaId } = req.params
	const diente = await createDienteController(odontogramaId)
	response(res, 200, diente)
}

export const updateDiente = async (req, res) => {
	const { id } = req.params
	const { face: faceNumber, color } = req.query
	await updateDienteController(id, faceNumber, color)
	response(res, 200, `Diente con id ${id} editado con éxito (face: ${faceNumber}, color: ${color})`)
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
