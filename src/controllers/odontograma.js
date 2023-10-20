import response from "../utils/response.js"
import Odontograma from "../models/odontograma.js"
import Consulta from "../models/consulta.js"
import Diente from "../models/diente.js"
import Paciente from "../models/paciente.js"
import Usuario from "../models/usuario.js"

export const getAllOdontogramas = async (req, res) => {
	const odontograma = await Odontograma.findAll()
	response(res, 200, odontograma)
}

export const getOdontograma = async (req, res) => {
	const { id } = req.params
	const odontograma = await Odontograma.findByPk(id, {
		include: [{ model: Diente }],
	})

	!odontograma ? response(res, 404, { message: "Odontograma no encontrado!" }) : response(res, 200, odontograma)
}

export const createOdontograma = async (req, res) => {
	try {
		const { id } = req.params
		const { child } = req.query // verifica el booleano en caso de ser niño

		const currentConsulta = await Consulta.findByPk(id)
		const newOdontograma = await Odontograma.create()
		await currentConsulta?.setOdontograma(newOdontograma)
		
		const cantidadDientes = child ? 20 : 36
		const dientesData = []
		for (let i = 1; i <= cantidadDientes; i++) {
			dientesData.push({
				name: `diente${i}`,
			})
		}
		const createdDientes = await Diente.bulkCreate(dientesData)
		await newOdontograma.setDientes(createdDientes)

		response(res, 200, newOdontograma)
	} catch (error) {
		console.error("Error al crear el odontograma:", error)
		response(res, 500, "Error interno del servidor")
	}
}

export const updateOdontograma = async (req, res) => {
	const { id } = req.params
	const odontograma = await Odontograma.findByPk(id)
	const updatedOdontograma = await odontograma?.update(req.body)
	response(res, 201, updatedOdontograma)
}

export const deleteOdontograma = async (req, res) => {
	const { id } = req.params
	const odontograma = await Odontograma.findByPk(id)
	await odontograma.destroy()
	response(res, 200, `Odontograma DNI: ${id} eliminado!`)
}

export default {
	getAllOdontogramas,
	getOdontograma,
	createOdontograma,
	updateOdontograma,
	deleteOdontograma,
}
