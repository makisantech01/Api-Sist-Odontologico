import response from "../utils/response.js"
import Diente from "../models/diente.js"
import Odontograma from "../models/odontograma.js"

export const getAllDientes = async (req, res) => {
	try {
		const dientes = await Diente.findAll()
		res.json(dientes)
	} catch (error) {
		console.error("Error al obtener los dientes del odontograma:", error)
		res.status(500).json({
			error: "Ocurrió un error al obtener los dientes del odontograma",
		})
	}
}

export const getDienteById = async (req, res) => {
	const { id } = req.params
	const diente = await Diente.findByPk(id, {
		include: [{ model: Odontograma }],
	})
	res.status(200).json(diente)
}

export const createDiente = async (req, res) => {
	const { id } = req.params
	// Crear el diente en la base de datos
	const foundOdontograma = await Odontograma.findByPk(id)
	const newDiente = await Diente.create(req.body)
	await foundOdontograma?.addDiente(newDiente)
	res.status(201).json(newDiente)
}

export const updateDiente = async (req, res) => {
	const { id } = req.params
	const { numero, posicionX, posicionY, caras, todoElDiente, observacion, prestacion, color } = req.body
	try {
		// Verificar si los campos requeridos están presentes
		if (!numero || !posicionX || !posicionY || !caras || !todoElDiente || !observacion || !prestacion) {
			return res.status(400).json({ error: "Faltan campos obligatorios" })
		}

		// Buscar el diente en la base de datos y actualizarlo
		const diente = await Diente.findByPk(id)
		if (!diente) {
			return res.status(404).json({ error: "Diente no encontrado" })
		}

		diente.numero = numero
		diente.posicionX = posicionX
		diente.posicionY = posicionY
		diente.caras = caras
		diente.todoElDiente = todoElDiente
		diente.observacion = observacion
		diente.color = color
		diente.prestacion = prestacion
		await diente.save()
		res.json(diente)
	} catch (error) {
		console.error("Error al actualizar el diente:", error)
		res.status(500).json({ error: "Ocurrió un error al actualizar el diente" })
	}
}

export const deleteDiente = async (req, res) => {
	const { id } = req.params
	try {
		// Buscar el diente en la base de datos y eliminarlo
		const diente = await Diente.findByPk(id)
		if (!diente) {
			return res.status(404).json({ error: "Diente no encontrado" })
		}

		await diente.destroy()
		res.json({ message: "Diente eliminado correctamente" })
	} catch (error) {
		console.error("Error al eliminar el diente:", error)
		res.status(500).json({ error: "Ocurrió un error al eliminar el diente" })
	}
}

export default {
	getAllDientes,
	getDienteById,
	createDiente,
	updateDiente,
	deleteDiente,
}
