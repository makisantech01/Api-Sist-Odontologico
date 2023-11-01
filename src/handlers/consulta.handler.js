import response from "../utils/response.js"
import { createConsultaController, deleteConsultaController, getAllConsultasController, getConsultaController, updateConsultaController } from "../controllers/consulta.js"

export const getAllConsultas = async (req, res) => {
		const consultas = await getAllConsultasController()
		response(res, 200, consultas)
}

export const getConsulta = async (req, res) => {
	const { id } = req.params
	const consulta = await getConsultaController(id)
	if(!consulta) throw new Error('No se encontró la consulta')
	response(res, 200, consulta)
}

export const createConsulta = async (req, res) => {
	const { dni } = req.params
	if (!dni) throw new Error('Falta especificar DNI para asociar un paciente')
	const consultaData = req.body
	const newConsulta = await createConsultaController(dni, consultaData)
	response(res, 200, newConsulta)
}

export const updateConsulta = async (req, res) => {
	const { id } = req.params
	if (!dni) throw new Error('Falta especificar DNI de la consulta')
	const consulta = await updateConsultaController(id)
	response(res, 201, consulta)
}

export const deleteConsulta = async (req, res) => {
	const { id } = req.params
	if (!id) throw new Error('Falta especificar el id de la consulta')
	await deleteConsultaController(id)
	response(res, 200, `Consulta ID: ${id} eliminada!`)
}
