import Observacion from "../models/observacion.js"
import Odontograma from "../models/odontograma.js"

export const getAllObservacionesController = async (odontogramaId) => {
	const observaciones = await Observacion.findAll({
		where: {
			odontogramaId: odontogramaId
		}
	})
	return observaciones
}

export const createObservacionController = async (id, data) => {
	const { title, content } = data
	if (!title || !content) throw new Error('Faltan datos necesarios (title - content)')
	const odontograma = await Odontograma.findByPk(id)
	if (!odontograma) throw new Error('No se encontro odontograma asociado al id')

	let newObservacion;
	try {
		newObservacion = await Observacion.create(data);
		await odontograma.addObservacion(newObservacion);
	} catch (error) {
		if (newObservacion) {
			await newObservacion.destroy();
			throw new Error('Fallo la asociación, el registro se borrará automáticamente');
		}
	}

	return newObservacion;
}

export const updateObservacionController = async (id, data) => {
	const toEditObservacion = await Observacion.findByPk(id)
	if (!toEditObservacion) throw new Error('No se encontro una observacion con ese ID')
	const { title, content } = data
	if (!title || !content) throw new Error('Faltan datos necesarios (title - content)')
	const editedObservacion = toEditObservacion.update({ title, content })
	return editedObservacion
}

export const deleteObservacionController = async (id) => {
	console.log('deleteObservacion')

	const toDeleteObservation = await Observacion.findByPk(id)
	if (!toDeleteObservation) throw new Error('No se encontro una observacion asociada al id')
	await toDeleteObservation.destroy()
	return 'Observacion eliminada con exito'

}
