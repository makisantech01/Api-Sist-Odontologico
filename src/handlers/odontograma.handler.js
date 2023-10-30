import response from "../utils/response.js"
import Odontograma from "../models/odontograma.js"
import Consulta from "../models/consulta.js"
import Diente from "../models/diente.js"
import { createOdontogramaController, getAllOdontogramasController, getOdontogramaController, updateOdontogramaController } from "../controllers/odontograma.js"

export const getAllOdontogramas = async (req, res) => {
	try {
		const odontogramas = await getAllOdontogramasController()
		response(res, 200, odontogramas)
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al solicitar odontogramas')
	}
}

export const getOdontograma = async (req, res) => {
	const { id } = req.params
	try {
		const odontograma = await getOdontogramaController(id)
		!odontograma ? response(res, 404, { message: "Odontograma no encontrado!" }) : response(res, 200, odontograma)
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al solicitar el odontograma')
	}
}

export const createOdontograma = async (req, res) => {
	try {
		const { id } = req.params
		const { child } = req.query // verifica el booleano en caso de ser niño
		const newOdontograma = await createOdontogramaController(id, child)
		response(res, 200, newOdontograma)

	} catch (error) {
		console.error(error.message)
		response(res, 400, "Error interno al crear el odontograma")
	}
}

export const updateOdontograma = async (req, res) => {
	const { id } = req.params
	try {
		const updatedOdontograma = await updateOdontogramaController(id)
		response(res, 201, updatedOdontograma)
	} catch (error) {
		console.log(error.message)
		response(res,400,'Error interno al actualizar odontograma')	
	}
}

export const deleteOdontograma = async (req, res) => {
	const { id } = req.params
	try {
		await updateOdontogramaController(id)
		response(res, 201, `Odontograma con id: ${id} eliminado con exito`)
	} catch (error) {
		console.log(error.message)
		response(res,400,'Error interno al eliminar odontograma')	
	}
}

export default {
	getAllOdontogramas,
	getOdontograma,
	createOdontograma,
	updateOdontograma,
	deleteOdontograma,
}
