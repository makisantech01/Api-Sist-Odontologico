import response from "../utils/response.js"
import { createConsultaController, deleteConsultaController, getAllConsultasController, getConsultaController, updateConsultaController } from "../controllers/consulta.js"

export const getAllConsultas = async (req, res) => {
	try {
		const consultas = await getAllConsultasController()
		response(res, 200, consultas)
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al obtener las consultas')
	}
}

export const getConsulta = async (req, res, next) => {
	const { id } = req.params
	try {
		const consulta = await getConsultaController(id)
		if (!consulta) throw new Error('No se encontró una consulta')
		response(res, 200, consulta)
	} catch (error) {
		next(error)
	}
}

export const createConsulta = async (req, res) => {
	const { dni } = req.params
	const consultaData = req.body
	try {
		const newConsulta = await createConsultaController(dni, consultaData)
		!newConsulta
			? response(res, 400, 'No se encuentra el paciente con el dni especificado')
			: response(res, 200, newConsulta)
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al crear la consulta')
	}
}

export const updateConsulta = async (req, res) => {
	const { id } = req.params
	try {
		const consulta = await updateConsultaController(id)
		response(res, 201, consulta)
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al editar la consulta')
	}
}

export const deleteConsulta = async (req, res) => {
	const { id } = req.params
	!id && response(res, 400, 'Falta especificar el id de la consulta')
	try {
		await deleteConsultaController(id)
		response(res, 200, `Consulta ID: ${id} eliminada!`)
	} catch (error) {
		console.log(error.message)
		response(res, 400, 'Error interno al borrar la consulta')
	}
}
