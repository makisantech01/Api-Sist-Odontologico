import response from "../utils/response.js"
import Odontograma from "../models/odontograma.js"
import Consulta from "../models/consulta.js"
import Diente from "../models/diente.js"

export const getAllOdontogramasController = async (req, res) => {
	const odontograma = await Odontograma.findAll()
	return odontograma
}

export const getOdontogramaController = async (id) => {
	const odontograma = await Odontograma.findByPk(id, {
		include: Diente,
		order: [
			[Diente, 'number', 'ASC']
		]
	})
	return odontograma
}

export const createOdontogramaController = async (id, child) => {
		const currentConsulta = await Consulta.findByPk(id)
		if (!currentConsulta) throw new Error('No se encontró la consulta especificada')
		if (Consulta.odontograma) throw new Error('La consulta ya tiene un odontograma asociado')

		const newOdontograma = await Odontograma.create()
		await currentConsulta?.setOdontograma(newOdontograma)

		const cantidadDientes = child ? 20 : 36
		const dientesData = []
		for (let i = 1; i <= cantidadDientes; i++) {
			dientesData.push({
				number: i,
			})
		}
		const createdDientes = await Diente.bulkCreate(dientesData)
		await newOdontograma.setDientes(createdDientes)
		return newOdontograma
}

export const updateOdontogramaController = async (id) => {
	const odontograma = await Odontograma.findByPk(id)
	const updatedOdontograma = await odontograma?.update(req.body)
	response(res, 201, updatedOdontograma)
}

export const deleteOdontogramaController = async (ids) => {
	const odontograma = await Odontograma.findByPk(id)
	await odontograma.destroy()
	return
}