import response from "../utils/response.js"
import Diente from "../models/diente.js"
import Odontograma from "../models/odontograma.js"

export const getAllDientes = async (req, res) => {
	try {
		const dientes = await Diente.findAll()
		res.json(dientes)

	} catch (error) {
		console.error("Error al obtener los dientes del odontograma:", error)
		response(res, 500, "Ocurrió un error al obtener los dientes del odontograma")
	}
}

export const getDienteById = async (req, res) => {
	const { id } = req.params
	const diente = await Diente.findByPk(id, {
		include: [{ model: Odontograma }],
	})
	response(res, 200, diente)
}

export const createDiente = async (req, res) => {
	const { odontogramaId } = req.params
	const foundOdontograma = await Odontograma.findByPk(odontogramaId)
	const newDiente = await Diente.create(req.body)
	await foundOdontograma?.addDiente(newDiente)
	response(res, 200, newDiente)
}

export const updateDiente = async (req, res) => {
	const { id } = req.params
	const { face: faceNumber, color } = req.query

	try {
		const diente = await Diente.findByPk(id)
		diente.set({ [`face${faceNumber}`]: color })
		await diente.save()
		return response(res, 200, `Datos del diente actualizados con éxito: face${faceNumber} color:${color}`)

	} catch (error) {
		console.log("Error al editar el diente:", error.message)
		return response(res, 400, "Error al editar el diente")
	}
}

export const deleteDiente = async (req, res) => {
	const { id } = req.params
	try {
		const diente = await Diente.findByPk(id)
		if (!diente) {
			return response(res, 400, "Diente no encontrado")
		}
		await diente.destroy()
		return response(res, 200, "Diente eliminado correctamente")

	} catch (error) {
		console.error("Error al eliminar el diente:", error.message)
		return response(res, 500, "Ocurrió un error al eliminar el diente")

	}
}

export default {
	getAllDientes,
	getDienteById,
	createDiente,
	updateDiente,
	deleteDiente,
}
