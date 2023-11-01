import response from "../utils/response.js"
import { createOdontogramaController, getAllOdontogramasController, getOdontogramaController, updateOdontogramaController } from "../controllers/odontograma.js"

export const getAllOdontogramas = async (req, res) => {
	const odontogramas = await getAllOdontogramasController()
	response(res, 200, odontogramas)
}

export const getOdontograma = async (req, res) => {
	const { id } = req.params
	const odontograma = await getOdontogramaController(id)
	if (!odontograma) throw new Error("Odontograma no encontrado!")
	response(res, 200, odontograma)
}

export const createOdontograma = async (req, res) => {
	const { id } = req.params
	const { child } = req.query // verifica el booleano en caso de ser niño
	if (!child || !id) throw new Error('Faltan datos necesarios (dni - child)')
	const newOdontograma = await createOdontogramaController(id, child)
	response(res, 200, newOdontograma)
}

export const updateOdontograma = async (req, res) => {
	const { id } = req.params
	if (!id) throw new Error('Faltan datos necesarios (dni)')
	const updatedOdontograma = await updateOdontogramaController(id)
	response(res, 201, updatedOdontograma)
}

export const deleteOdontograma = async (req, res) => {
	const { id } = req.params
	if (!id) throw new Error('Faltan datos necesarios (dni)')
	await updateOdontogramaController(id)
	response(res, 201, `Odontograma con id: ${id} eliminado con exito`)

}

export default {
	getAllOdontogramas,
	getOdontograma,
	createOdontograma,
	updateOdontograma,
	deleteOdontograma,
}
