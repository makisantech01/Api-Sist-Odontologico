import { datacatalog_v1 } from "googleapis"
import {
	createObservacionController,
	deleteObservacionController,
	getObservacionesController,
	getAllObservacionesController,
	updateObservacionController
} from "../controllers/observacion.js"

import response from "../utils/response.js"

export const getAllObservaciones = async (req, res) => {
	const observaciones = await getAllObservacionesController()
	response(res, 200, observaciones)
}

export const getObservaciones = async (req, res) => {
	const { id } = req.params
	const observaciones = await getObservacionesController(id)
	response(res, 200, observaciones)
}

export const createObservacion = async (req, res) => {
	const { id } = req.params
	const data = req.body
	const observacion = await createObservacionController(id, data)
	response(res, 200, observacion)
}

export const updateObservacion = async (req, res) => {
	console.log('updateObservacion')

	const { id } = req.params
	const data = req.body
	const editedObservacion = await updateObservacionController(id, data)
	response(res, 200, editedObservacion)
}

export const deleteObservacion = async (req, res) => {
	const { id } = req.params
	const message = await deleteObservacionController(id)
	response(res, 200, message)
}
