import Consulta from "../models/consulta.js"
import Diente from "../models/diente.js"
import Odontograma from "../models/odontograma.js"
import Paciente from "../models/paciente.js"
import Usuario from "../models/usuario.js"
import getUserIdValueFromObject from "../utils/getUserIdValueFromObject.js"

export const getAllDientesController = async () => {
	const dientes = await Diente.findAll()
	return dientes
}

export const getDienteByIdController = async (id) => {
	const nestedDiente = await Diente.findByPk(id, {
		include: { all: true, nested: true }
	})
	const userIdResource = getUserIdValueFromObject(nestedDiente)

	const diente = await Diente.findByPk(id, {
		include:
		{
			model: Odontograma,
			as: 'odontograma'
		}
	})

	return { diente, userIdResource }
}

export const createDienteController = async (odontogramaId) => {
	const foundOdontograma = await Odontograma.findByPk(odontogramaId)
	if (!foundOdontograma) throw new Error('No se encontró odontograma asociado al ID')
	let newDiente
	try {
		newDiente = await Diente.create(req.body)
		await foundOdontograma?.addDiente(newDiente)
	} catch (error) {
		newDiente.destroy()
		throw new Error(error)
	}
	return newDiente
}

export const updateDienteController = async (id, faceNumber, color) => {
	const diente = await Diente.findByPk(id)
	diente.set({ [`face${faceNumber}`]: color })
	await diente.save()
	return diente

}

export const deleteDienteController = async (id) => {
	const diente = await Diente.findByPk(id)
	if (!diente) throw new Error('Diente no encontrado')
	await diente.destroy()
	return "Diente eliminado correctamente"
}